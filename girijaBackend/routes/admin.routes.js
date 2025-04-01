const express = require('express');
const router = express.Router();
const { getAllUserProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth.middleware');
const checkRole = require('../middleware/roles.middleware')



router.get('/all-profiles',authenticateToken,checkRole("Admin"),getAllUserProfile)

module.exports = router;