const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// Route to get FamilyReligious data by userId
router.get('/familyReligious/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await FamilyReligious.findOne({ userId });
    if (!data) {
      return res.status(404).json({ message: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data', error });
  }
});


// MongoDB model for Family and Religious Information
const FamilyReligiousSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, // Reference to User model
  fatherName: String,
  motherName: String,
  Siblings:String,
  caste: String,
  nakshatra: String,
  rashi: String,
  gotra: String,
 
}, { timestamps: true });

const FamilyReligious = mongoose.model('FamilyReligious', FamilyReligiousSchema);

// Route for adding a new FamilyReligious record
router.post('/addFamilyReligious', async (req, res) => {
  const { userId, fatherName, motherName, siblings,caste, nakshatra, rashi, gotra } = req.body;
  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Check if a record already exists for the user
    const existingRecord = await FamilyReligious.findOne({ userId });
    if (existingRecord) {
      return res.status(400).json({ message: 'Record already exists for this user' });
    }

    // Create a new document
    const newRecord = new FamilyReligious({
      userId,
      fatherName,
      motherName,
      siblings,
      caste,
      nakshatra,
      rashi,
      gotra
    });

    await newRecord.save();

    res.status(201).json({
      message: 'New Family Religious record added successfully',
      data: newRecord
    });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Error adding data', error });
  }
});

// Route for updating an existing FamilyReligious record
router.put('/updateFamilyReligious', async (req, res) => {
  const { userId, fatherName, motherName, Siblings,caste, nakshatra, rashi, gotra } = req.body;
  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Find the document by userId
    const existingRecord = await FamilyReligious.findOne({ userId });
    if (!existingRecord) {
      return res.status(404).json({ message: 'No record found for the given userId' });
    }

    // Update the fields
 
    existingRecord.fatherName = fatherName;
    existingRecord.motherName = motherName;
    existingRecord.Siblings = Siblings;
    existingRecord.caste = caste;
    existingRecord.nakshatra = nakshatra;
    existingRecord.rashi = rashi;
    existingRecord.gotra = gotra;

    await existingRecord.save();

    res.status(200).json({
      message: 'Family Religious record updated successfully',
      data: existingRecord
    });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data', error });
  }
});

module.exports = router;
