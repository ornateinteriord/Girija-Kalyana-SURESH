const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Path to your User model
const mongoose = require("mongoose");

router.post("/updateLike", async (req, res) => {
<<<<<<< HEAD
  const { userId, liked } = req.body;

  // Ensure the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
=======
  const { loggedInUserId, likedUserId, liked } = req.body;

  if (!mongoose.Types.ObjectId.isValid(loggedInUserId) || !mongoose.Types.ObjectId.isValid(likedUserId)) {
>>>>>>> 90302d1 (my intrest updated)
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
<<<<<<< HEAD
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
=======
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    if (liked) {
      // Add likedUserId to the likedUsers array if not already present
      if (!loggedInUser.likedUsers.includes(likedUserId)) {
        loggedInUser.likedUsers.push(likedUserId);
      }
    } else {
      // Remove likedUserId from the likedUsers array
      loggedInUser.likedUsers = loggedInUser.likedUsers.filter(id => id.toString() !== likedUserId);
    }

    await loggedInUser.save();
    const updatedUser = await loggedInUser.populate("likedUsers", "name email profilePic");
    res.status(200).json({ message: "Like status updated successfully", likedUsers: updatedUser.likedUsers });
    
>>>>>>> 90302d1 (my intrest updated)
  } catch (error) {
    console.error("Error updating like status:", error);
    res.status(500).json({ message: "Error updating like status", error: error.message });
  }
});

<<<<<<< HEAD
=======
router.get("/getLikedUsers/:loggedInUserId", async (req, res) => {
  const { loggedInUserId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await User.findById(loggedInUserId).populate("likedUsers", "name email profilePic"); // Adjust fields as needed

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ likedUsers: user.likedUsers });
  } catch (error) {
    console.error("Error fetching liked users:", error);
    res.status(500).json({ message: "Error fetching liked users", error: error.message });
  }
});


>>>>>>> 90302d1 (my intrest updated)

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
<<<<<<< HEAD
=======
        if (req.body.age) updates.age = req.body.age;
>>>>>>> 90302d1 (my intrest updated)
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