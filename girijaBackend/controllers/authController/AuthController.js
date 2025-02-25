const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user with exact username match
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Compare passwords (in real apps, use bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password' 
      });
    }

    // Check account status
    if (user.status !== 'active') {
      return res.status(403).json({ 
        success: false, 
        message: `Account is ${user.status}. Please contact support.`,
        status: user.status,
        UpdateStatus: user.UpdateStatus 
      });
    }

    // Update login info
    user.last_loggedin = new Date();
    user.counter += 1;
    user.loggedin_from = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    await user.save();

    // Create token with essential user data
    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        user_role: user.user_role,
       
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user,
      dashboard: getDashboardPath(user.user_role),
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login',
      error: error.message 
    });
  }
};

function getDashboardPath(role) {
  const paths = {
    Admin: '/admin/dashboard',
    PremiumUser: '/premium/dashboard',
    Assistance: '/assistance/dashboard',
  };
  return paths[role] || '/user/dashboard';
}

module.exports = {
  login
};