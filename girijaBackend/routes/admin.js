const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();


const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};


router.get('/dashboard', adminAuth, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;
