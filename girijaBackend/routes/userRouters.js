const express = require("express");
const { getAllUsers ,getAllUsers1 } = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getAllUsers1); // Fetch all users


module.exports = router;
