/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API endpoints for the authenticated user's profile
 */

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get current user's profile
 *     description: Retrieve profile information of the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 *
 *   patch:
 *     summary: Update current user's profile
 *     description: Allows the authenticated user to update limited profile fields such as name, and avatar.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *             example:
 *               name: "John Doe"
 *               avatar: "https://example.com/avatar.jpg"
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get profile
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile
// router.patch("/", async (req, res) => {
//   try {
//     const allowedUpdates = ["name", "avatar"];
//     const updates = {};

//     allowedUpdates.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         updates[field] = req.body[field];
//       }
//     });

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.userId,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select("-password -refreshToken");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
