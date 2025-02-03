const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    // ✅ Fetch unique users based on mobile number & email
    const users = await User.aggregate([
      {
        $group: {
          _id: { mobile: "$mobile", email: "$email" }, // Group by mobile & email
          doc: { $first: "$$ROOT" }, // Keep only the first unique record
        },
      },
      { $replaceRoot: { newRoot: "$doc" } }, // Replace root with the selected document
      { $skip: (page - 1) * limit }, // Pagination
      { $limit: limit },
      {
        $project: {
          password: 0, // Exclude sensitive data
          resetPasswordOTP: 0,
          resetPasswordExpires: 0,
        },
      },
    ]);

    // Count the total number of users that were grouped by unique mobile & email
    const totalUsers = await User.aggregate([
      {
        $group: {
          _id: { mobile: "$mobile", email: "$email" },
        },
      },
      { $count: "total" },
    ]);
    const total = totalUsers[0] ? totalUsers[0].total : 0;

    res.status(200).json({
      totalUsers: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

const getAllUsers1 = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Validate input
    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ message: "Page and limit must be positive integers" });
    }

    // Fetch paginated users (excluding sensitive fields)
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password -resetPasswordOTP -resetPasswordExpires");

    // Calculate pagination metadata
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      totalUsers,
      totalPages,
      currentPage: page,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};




module.exports = { getAllUsers , getAllUsers1 };
