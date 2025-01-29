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

module.exports = router;
