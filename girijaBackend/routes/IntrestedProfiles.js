const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User"); 

const router = express.Router();

// POST API to Express Interest in a User
router.post("/express-interest", async (req, res) => {
  try {
    const { loggedInUserId, interestedUserId } = req.body; 

    if (!loggedInUserId || !interestedUserId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Find the logged-in user and update their interestedUsers list
    const user = await User.findById(loggedInUserId).select("-password -resetPasswordOTP -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({ error: "Logged-in user not found." });
    }

    // Check if the user has already expressed interest
    if (user.interestedUsers.includes(interestedUserId)) {
      return res.status(400).json({ error: "Interest already expressed." });
    }

    user.interestedUsers.push(interestedUserId);
    await user.save();

    res.status(200).json({ message: "Interest Expressed Successfully!" });
  } catch (error) {
    console.error("Error expressing interest:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

//  remove interest
router.post('/remove-interest', async (req, res) => {
  const { loggedInUserId, interestedUserId } = req.body;

  try {
    
    await User.findByIdAndUpdate(loggedInUserId, { $pull: { interestedUsers: interestedUserId } });
    res.status(200).json({ message: 'Interest removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove interest' });
  }
});

// check intrests
router.get('/check-interest-status', async (req, res) => {
  const { loggedInUserId, interestedUserId } = req.query;

  try {
    if (!loggedInUserId || !interestedUserId) {
      return res.status(400).json({ error: "Missing user IDs" });
    }

    const loggedInUser = await User.findById(loggedInUserId).select('interestedUsers');

    if (!loggedInUser) {
      return res.status(404).json({ error: "Logged-in user not found" });
    }
    const isInterested = loggedInUser.interestedUsers.includes(interestedUserId);

    res.status(200).json({ isInterested });
  } catch (error) {
    console.error("Error checking interest status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/user-dashboard/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("interestedUsers", "firstName lastName email dob profileImg")
      .select("-password -resetPasswordOTP -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user dashboard:", error);
    res.status(500).json({ error: "Error fetching user dashboard." });
  }
});

router.get("/interested-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find users who have expressed interest in `userId`
    const interestedUsers = await User.find({ interestedUsers: userId }) // ✅ Corrected query
      .select("firstName lastName profileImg address");

    if (interestedUsers.length === 0) {
      return res.status(404).json({ error: "No interested users found." });
    }

    res.status(200).json(interestedUsers);
  } catch (error) {
    console.error("Error fetching interested users:", error);
    res.status(500).json({ error: "Failed to fetch interested users." });
  }
});


module.exports = router;
