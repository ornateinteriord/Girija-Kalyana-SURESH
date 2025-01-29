
const express = require('express');

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

const router = express.Router();
app.use(bodyParser.json());

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// In-memory storage for OTPs (can replace with Redis or database for production)
const otpStorage = new Map();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Helper function: Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper function: Send OTP via email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Endpoint: Forgot Password (Send OTP)
router.post('/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    // Generate and store OTP
    const otp = generateOTP();
    otpStorage.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // Expires in 10 minutes

    // Send OTP to user
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error in sending OTP:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Endpoint: Verify OTP
router.post('/auth/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    const storedOtpData = otpStorage.get(email);

    // Check if OTP exists and is not expired
    if (!storedOtpData || storedOtpData.otp !== otp || storedOtpData.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // OTP verified, remove from storage
    otpStorage.delete(email);

    res.status(200).json({ message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Error in OTP verification:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// Endpoint: Reset Password
router.post('/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword, confirmPassword, otp } = req.body;

    if (!email || !newPassword || !confirmPassword || !otp) {
      return res.status(400).json({ message: 'Email, OTP, new password, and confirmation are required.' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Check if OTP is valid and hasn't expired
    const storedOtpData = otpStorage.get(email);
    if (!storedOtpData || storedOtpData.otp !== otp || storedOtpData.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // OTP is valid, remove from storage
    otpStorage.delete(email);

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error in password reset:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


//**** 

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// const generateUserId = () => {
//   const timestamp = Date.now(); // Current timestamp
//   const randomString = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
//   return `USER-${timestamp}-${randomString.toUpperCase()}`; // Format: USER-<timestamp>-<random>
// };


// Register a user
router.post('/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, gender, dob, email, password,mobile } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !gender || !dob || !email || !password || !mobile) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

      // Validate mobile number format
      const mobileRegex = /^\d{10}$/; // Adjust regex for your requirements
      if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ message: 'Invalid mobile number format.' });
      }
    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      firstName,
      lastName,
      gender,
      dob,
      mobile,
      email,
      password: hashedPassword,
     
    });
    await newUser.save();

    // Creating response structure with userId at the top
    const userResponse = {
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      mobile: newUser.mobile,
      id: newUser._id, // Keep MongoDB _id as id for easy reference
    };

    res.status(201).json({ message: 'User registered successfully.', user: userResponse });
  } catch (error) {
    console.error('Error in Register:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// Login a user
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful.', token, user });

   
  } catch (error) {
    console.error('Error in Login:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;