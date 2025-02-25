import React, { useState } from 'react';
import './Navbar.scss';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { MdEmail, MdLock } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openAdminDialog, setOpenAdminDialog] = useState(false);
  const [enterUsername, setEnterUsername] = useState('');
  const [enterPassword, setEnterPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success(response.data.message);
      setOtpSent(true);
    } catch (error) {
      toast.error('Error sending OTP: ' + error.response?.data?.message || error.message);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword,
        confirmPassword,
        otp,
      });

      if (response.data.message === 'Password reset successfully.') {
        toast.success(response.data.message);
        setOpenForgotPassword(false);
        navigate('/');
      } else {
        toast.error(response.data.message || 'Error resetting password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error resetting password');
    }
  };

  const handleOpenAdminDialog = () => setOpenAdminDialog(true);
  const handleCloseAdminDialog = () => setOpenAdminDialog(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleToggleForm = () => setIsRegister((prev) => !prev);

  const handleOpenForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => setOpenForgotPassword(false);

  const handleAdminLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: enterUsername,
        password: enterPassword
      });
      
      const { token, user, dashboardPath } = response.data;
      
      if (user.user_role === 'Admin') {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Admin Login successful!');
        navigate('/admin/dashboard'); // Explicit path
        handleCloseAdminDialog();
      } else {
        toast.error('Access Denied: Admin privileges required');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: loginData.email,
        password: loginData.password
      });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        user_id: user.user_id,
        username: user.username,
        user_role: user.user_role,
        ref_no: user.ref_no,
        mobile_no: user.mobile_no,
        status: user.status
      }));
      
      toast.success('Login successful!');
      
      // Navigate based on user role
      if (user.user_role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.user_role === 'PremiumUser' || user.user_role === 'FreeUser') {
        navigate('/user/dashboard');
      } else {
        navigate('/');
      }
      
      handleClose();
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };


  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="navbar">
          <h3>Girija❤️Kalyana</h3>
          <div className="menu">
            <ul>
              <li>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link" to="/service">
                  Service
                </Link>
              </li>
              <li>
                <Link className="link" to="/about">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="link" to="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="link" to="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpen}
              style={{
                backgroundColor: 'black',
                marginRight: '25px',
                width: '150px',
                color: '#fff',
                fontWeight: 700,
                height: '42px',
                textTransform: 'capitalize',
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={handleOpenAdminDialog}
              style={{
                backgroundColor: 'black',
                marginRight: '25px',
                width: '150px',
                color: '#fff',
                fontWeight: 700,
                height: '42px',
                textTransform: 'capitalize',
              }}
            >
              Admin
            </Button>
          </Typography>
        </div>
      </div>

      {/* Login/Register Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            padding: '20px',
            maxWidth: '600px',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight={700} color="#34495e" mt={1} mb={1}>
            {isRegister ? 'Create Your Account' : 'Login'}
          </Typography>
          {isRegister ? (
            <form style={{ width: '100%' }}>
              <Box display="flex" gap={2} flexWrap="wrap" marginBottom={1.5}>
                <TextField
                  style={{ flex: 1 }}
                  label="First Name"
                  name="firstName"
                  value={registerData.firstName}
                  onChange={handleChangeRegister}
                  variant="outlined"
                />
                <TextField
                  style={{ flex: 1 }}
                  label="Last Name"
                  name="lastName"
                  value={registerData.lastName}
                  onChange={handleChangeRegister}
                  variant="outlined"
                />
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap" marginBottom={0}>
                <FormControl style={{ flex: 1 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={registerData.gender}
                    onChange={handleChangeRegister}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  style={{ flex: 1 }}
                  label="Date of Birth"
                  name="dob"
                  value={registerData.dob}
                  onChange={handleChangeRegister}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  name="mobile"
                  value={registerData.mobile}
                  onChange={handleChangeRegister}
                  variant="outlined"
                  margin="normal"
                />
              </Box>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={registerData.email}
                onChange={handleChangeRegister}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={registerData.password}
                onChange={handleChangeRegister}
                type="password"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleChangeRegister}
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Button
                variant="contained"
                onClick={handleRegister}
                sx={{
                  background: '#34495e',
                  width: '50%',
                  display: 'flex',
                  justifySelf: 'center',
                  marginBottom: '15px',
                  marginTop: '15px',
                }}
              >
                Create Account
              </Button>
            </form>
          ) : (
            <form style={{ width: '100%', height: '90%', padding: '40px 20px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <TextField
                sx={{ width: '400px' }}
                label="Enter Email"
                name="email"
                value={loginData.email}
                onChange={handleChangeLogin}
                variant="outlined"
                margin="normal"
              />
              <TextField
                sx={{ width: '400px', marginBottom: '20px' }}
                label="Enter Password"
                name="password"
                value={loginData.password}
                onChange={handleChangeLogin}
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Typography sx={{ color: '#1976d2', cursor: 'pointer' }} mb={1.5} onClick={handleOpenForgotPassword}>
                Forgot Password?
              </Typography>
              <Button
                variant="contained"
                onClick={handleLogin}
                sx={{
                  width: '250px',
                  background: '#34495e',
                }}
              >
                Login
              </Button>
            </form>
          )}
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ cursor: 'pointer', color: '#1976d2', marginBottom: '10px' }}
            onClick={handleToggleForm}
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Typography>
        </Box>
      </Dialog>

      <Dialog
        open={openAdminDialog}
        onClose={handleCloseAdminDialog}
        sx={{
          '& .MuiDialog-paper': {
            width: '350px',
            height: '430px',
            background: '#fff',
            backdropFilter: 'blur(10px)',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            textAlign: 'center',
            marginTop: '70px',
          },
        }}
      >
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginBottom: '10px',
          }}
        >
          <img
            src="src/assets/profile.jpg"
            alt="Admin Profile"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>

        <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold', color: 'black' }}>
          Admin Login
        </Typography>

        <TextField
          placeholder="Enter username"
          variant="outlined"
          margin="dense"
          value={enterUsername}
          onChange={(e) => setEnterUsername(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: { color: 'black', marginBottom: '18px', fontWeight: 700, borderRadius: '13px' },
          }}
        />

        <TextField
          placeholder="Enter password"
          variant="outlined"
          type="password"
          value={enterPassword}
          onChange={(e) => setEnterPassword(e.target.value)}
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
            style: { color: 'black', marginBottom: '15px', borderRadius: '13px', fontWeight: 700 },
          }}
        />

        <Typography sx={{ color: 'black' }} onClick={handleOpenForgotPassword}>
          Forgot Password?
        </Typography>
        <Typography style={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-end', gap: '6px' }}>
          <Button
            variant="outlined"
            onClick={handleAdminLogin}
            sx={{
              marginTop: '20px',
              color: 'black',
              width: '150px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#1a4f72', color: '#fff' },
            }}
          >
            LOGIN
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseAdminDialog}
            sx={{
              marginTop: '20px',
              color: 'black',
              width: '150px',
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#1a4f72', color: '#fff' },
            }}
          >
            Cancel
          </Button>
        </Typography>
      </Dialog>

      <div>
        <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword}>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              otpSent ? handleResetPassword() : handleSendOtp();
            }}
            sx={{
              padding: '20px',
              width: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {!otpSent ? (
              <>
                <Typography variant="h6" textAlign="center">
                  Forgot Password
                </Typography>
                <TextField
                  fullWidth
                  label="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: '150px',
                    alignSelf: 'center',
                    background: '#34495e',
                  }}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" textAlign="center">
                  Reset Password
                </Typography>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  variant="outlined"
                  required
                />
                <TextField
                  fullWidth
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  variant="outlined"
                  type="password"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  type="password"
                  required
                />
                {error && (
                  <Typography color="error" textAlign="center">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: '190px',
                    padding: '10px',
                    alignSelf: 'center',
                    background: '#34495e',
                    marginTop: '10px',
                  }}
                >
                  Reset Password
                </Button>
              </>
            )}
            <Button
              onClick={handleCloseForgotPassword}
              sx={{ alignSelf: 'center', color: '#1976d2', '&:hover': { backgroundColor: 'transparent' } }}
            >
              Cancel
            </Button>
          </Box>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;