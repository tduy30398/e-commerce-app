const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// GET messages between current user and another
router.get("/:userId", authMiddleware, async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { from: req.user.userId, to: userId },
        { from: userId, to: req.user.userId },
      ],
    })
      .populate("from to", "name avatar role")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
