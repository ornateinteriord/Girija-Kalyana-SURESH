const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');
router.get('/parentsPrefer/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Validate the userId as a proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId. Must be a valid ObjectId.' });
      }
  
      // Query the database directly with userId
      const data = await User.findOne({ _id: userId });
      if (!data) {
        return res.status(404).json({ message: 'No data found' });
      }
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data', error });
    }
  });
  
  router.post("/parentsPrefer", async (req, res) => {
    try {
      const { userId, parentPrefer } = req.body;
  
      // Validate if userId is provided and is a valid ObjectId
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid or missing userId" });
      }
  
      // Update or Create User Preferences
      const savedPreference = await User.findOneAndUpdate(
        { _id: userId }, // Directly use userId here (validated earlier)
        { parentPrefer }, // Update parent preferences
        { new: true, upsert: true } // `upsert` creates the document if it doesn't exist
      );
  
      res.status(201).json({
        message: "Preferences saved successfully",
        data: savedPreference,
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      res.status(500).json({
        message: "Failed to save preferences",
        error: error.message,
      });
    }
  });
  
module.exports = router;