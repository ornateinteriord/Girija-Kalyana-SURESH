const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

router.get('/lifeStyle/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate the userId as a proper ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId. Must be a valid ObjectId.' });
    }

    // Create a new ObjectId instance using the new keyword
    const objectId = new mongoose.Types.ObjectId(userId);

    // Query the database using the ObjectId
    const data = await User.findOne({ _id: objectId });
    if (!data) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// POST route to update or create lifestyle data
router.post("/lifeStyle", async (req, res) => {
    const { userId, drink, smoke, diet, sunsign, bloodgroup, bodyType, skinType } = req.body;
  
    try {
      // Validate the userId as a proper ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId. Must be a valid ObjectId." });
      }
  
      const objectId = new mongoose.Types.ObjectId(userId);
  
      // Update the lifestyle data if the user exists; otherwise, create it
      const updatedUser = await User.findByIdAndUpdate(
        objectId,
        {
          $set: {
            "lifestyle.drink": drink,
            "lifestyle.smoke": smoke,
            "lifestyle.diet": diet,
            "lifestyle.sunsign": sunsign,
            "lifestyle.bloodgroup": bloodgroup,
            "lifestyle.bodyType": bodyType,
            "lifestyle.skinType": skinType,
          },
        },
        { new: true, upsert: true } // Create a new document if not found
      );
  
      res.status(200).json({ message: "Lifestyle updated successfully", data: updatedUser });
    } catch (error) {
      console.error("Error updating lifestyle:", error);
      res.status(500).json({ message: "Error updating lifestyle", error });
    }
  });

module.exports = router;
