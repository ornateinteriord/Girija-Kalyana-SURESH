const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Path to your User model
const mongoose = require("mongoose");

router.post("/updateLike", async (req, res) => {
  const { userId, liked } = req.body;

  // Ensure the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Find the user and update the like status
    const updatedUser = await User.findByIdAndUpdate(
      objectId,
      { $set: { like: liked } }, // Update the like status
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Like status updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Error updating like status", error: error.message });
  }
});


// Route to fetch "About" data by userId
router.get("/about/:userId", async (req, res) => {
    const { userId } = req.params;
 
    try {
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Return the user data
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Error fetching user data", error: error.message });
    }
  });

  //for add
 
// Middleware

router.put('/updateImg/:id', async (req , res) => {
    try {
        const userId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        const {profileImg} = req.body
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { profileImg } }, // Use $set to add or update the field
            { new: true, upsert: true, runValidators: true }
          );

          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
          res.status(500).json({ message: 'Error updating user', error: error.message });
        }
      });

  
router.patch("/update/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const updates = {};
        if (req.body.address) updates.address = req.body.address;
        if (req.body.pincode) updates.pincode = req.body.pincode;
        if (req.body.occupationCountry) updates.occupationCountry = req.body.occupationCountry;
        if (req.body.language) updates.language = req.body.language;
        if (req.body.firstName) updates.firstName = req.body.firstName;
        if (req.body.lastName) updates.lastName = req.body.lastName;
        if (req.body.dob) updates.dob = req.body.dob;
        if (req.body.state) updates.state = req.body.state;
        if (req.body.mobile) updates.mobile = req.body.mobile;
        if (req.body.email) updates.email = req.body.email;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: "No fields to update provided" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser }); // Explicit 200 status

    } catch (error) {
        console.error("Error updating user:", error);

        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation error", errors: error.errors });
        } else if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid user ID" });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: "Duplicate key error", error: error });
        }

        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

module.exports = router;