const express = require('express');
const router = express.Router();
const { getProfileByRegistrationNo } = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth.middleware');




router.get('/profile/:registration_no',authenticateToken,getProfileByRegistrationNo);


module.exports = router;