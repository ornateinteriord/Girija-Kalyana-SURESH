const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const mongoose = require("mongoose"); 

// Fetch Complete User Details
router.get("/user-details/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password -resetPasswordOTP -resetPasswordExpires");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Error fetching user details" });
  }
});

// Fetch Accepted Users
router.get("/accepted-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId provided" });
    }

    const user = await User.findById(userId).populate("acceptedBy");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.acceptedBy);
  } catch (error) {
    console.error("Error fetching accepted users:", error);
    res.status(500).json({ error: "Server error while fetching accepted users" });
  }
});



// Accept Interest Request

router.post("/accept-interest", async (req, res) => {
  try {
    let { userId, targetUserId, accept } = req.body;

    userId = new mongoose.Types.ObjectId(userId);
    targetUserId = new mongoose.Types.ObjectId(targetUserId);

    if (accept) {
      // Accept request: Remove from interested list and add to accepted list
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { interestedIn: targetUserId },
          $addToSet: { acceptedBy: targetUserId },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        targetUserId,
        {
          $pull: { sentInterestBy: userId },
          $addToSet: { acceptedBy: userId },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        success: true,
        message: "Interest accepted successfully!",
      });

    } else {
    
      await User.findByIdAndUpdate(userId, { $pull: { interestedIn: targetUserId } }, { new: true });
      await User.findByIdAndUpdate(targetUserId, { $pull: { sentInterestBy: userId } }, { new: true });

      res.json({
        success: true,
        message: "Interest rejected successfully!",
      });
    }

  } catch (error) {
    console.error("Error processing interest response:", error);
    res.status(500).json({ error: "Error processing interest response" });
  }
});






// Remove Connection
router.post("/remove-accepted", async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({ error: "Invalid user IDs" });
    }

    await User.findByIdAndUpdate(userId, { $pull: { acceptedBy: targetUserId } });
    await User.findByIdAndUpdate(targetUserId, { $pull: { acceptedBy: userId } });

    res.json({ success: true, message: "Connection removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing connection" });
  }
});


// Fetch Interested Users
router.get("/interested-users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const interestedUsers = await User.find({ interestedIn: userId });
    res.json(interestedUsers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching interested users" });
  }
});

// Fetch Sent Interests
router.get("/sent-interests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const sentInterests = await User.find({ sentInterestBy: userId });
    res.json(sentInterests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching sent interests" });
  }
});

// Fetch Pending Interests
router.get("/pending-interests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const pendingInterests = await User.find({ pendingFor: userId });
    res.json(pendingInterests);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending interests" });
  }
});

module.exports = router;
