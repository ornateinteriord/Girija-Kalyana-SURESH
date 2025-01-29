const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();

router.get('/others/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    
    const data = await User.findOne({ _id: userId });

    if (!data) {
      return res.status(400).json({ message: 'User ID not found' });
    }

    
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});


router.post('/others', async (req, res) => {
    const { userId, info } = req.body; 
  
    try {
      
      if ( !info) {
        return res.status(400).json({ message: ' info are required' });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
      }
  
     
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId }, 
        { info },         
        { new: true }    
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User info updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating info:', error);
      res.status(500).json({ message: 'Error updating info', error });
    }
  });
  

module.exports = router;
