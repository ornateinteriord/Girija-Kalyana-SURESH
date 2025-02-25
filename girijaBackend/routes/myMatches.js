const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("userId firstName lastName address dob profileImg parentPrefer");

    const totalItems = await User.countDocuments();

    // Return users with image URLs
    res.json({ users, totalItems });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

<<<<<<< HEAD
=======

// Search API
router.get("/search", async (req, res) => {
  try {
    const { searchQuery } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const profiles = await User.find({
      $or: [
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (profiles.length === 0) {
      return res.status(404).json({ error: "No profiles found" });
    }

    res.json(profiles);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




>>>>>>> 90302d1 (my intrest updated)
module.exports = router;
