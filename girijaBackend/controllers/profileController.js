const Profile = require('../models/profile');

// Get profile by registration number
exports.getProfileByRegistrationNo = async (req, res) => {
  try {
    const { registration_no } = req.params;
    
    const profile = await Profile.findOne({ registration_no });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found with the given registration number'
      });
    }
    
    res.status(200).json({
      success: true,
      data: profile
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};