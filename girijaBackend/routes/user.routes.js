const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/roles.middleware');
const { getProfileByRegistrationNo } = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth.middleware');


// router.get('/dashboard', 
//   authMiddleware,
//   roleMiddleware(['PremiumUser', 'FreeUser']),
//   (req, res) => {
//     res.json({
//       message: 'User Dashboard',
//       user: req.user
//     });
//   }
// );

router.get('/profile/:registration_no',authenticateToken,getProfileByRegistrationNo);


module.exports = router;