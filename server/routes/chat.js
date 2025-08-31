const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const authMiddleware = require("../middleware/authMiddleware");

// GET messages between current user and another
router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [messages, totalMessages] = await Promise.all([
      Message.find({
        $or: [
          { from: req.user.userId, to: userId },
          { from: userId, to: req.user.userId },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Message.countDocuments({
        $or: [
          { from: req.user.userId, to: userId },
          { from: userId, to: req.user.userId },
        ],
      }),
    ]);

    res.status(200).json({
      data: messages.reverse(),
      pagination: {
        totalItems: totalMessages,
        page,
        limit,
        totalPages: Math.ceil(totalMessages / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

module.exports = router;
