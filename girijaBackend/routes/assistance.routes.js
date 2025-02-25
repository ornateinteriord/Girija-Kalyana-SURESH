const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/roles.middleware');

router.get('/dashboard', 
  authMiddleware,
  roleMiddleware(['Assistance']),
  (req, res) => {
    res.json({
      message: 'Assistance Dashboard',
      user: req.user
    });
  }
);

module.exports = router;