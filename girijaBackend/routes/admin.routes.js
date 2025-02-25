const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/roles.middleware');
const User = require('../models/user.model');

router.get('/dashboard', 
  authMiddleware,
  roleMiddleware(['Admin']),
  async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json({
        message: 'Admin Dashboard',
        users,
        user: req.user
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }
);

module.exports = router;