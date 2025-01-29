const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/education', async (req, res) => {
    try {
        const { userId, degree, occupation, income, occupationCountry } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { "education": { degree, occupation, income, occupationCountry } } },
            { new: true, runValidators: true, upsert: true } // Return updated doc, run validation and upsert
        );

        res.status(200).json({ message: "Education data saved/updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error saving/updating education:", error);

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: "Validation error", messages: validationErrors });
        } else if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: "Invalid User ID format" });
        }

        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

router.put("/education/:userId", async (req, res) => {
   
    const { userId } = req.params;
    const { degree, occupation, income, occupationCountry } = req.body;

    if (!isValidObjectId(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
    }

    if (!degree || !occupation || !income || !occupationCountry) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { "education": { degree, occupation, income, occupationCountry } } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: `User not found with userId: ${userId}` });
        }

        res.status(200).json({ message: "Education data updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating education data:", error);
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: "Validation error", messages: validationErrors });
        } else if (error.kind === 'ObjectId') {
            return res.status(400).json({ error: "Invalid User ID format" });
        }
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
});

module.exports = router;