const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const role = req.query.role || "";

    const query = {};

    if (role) {
      query.role = role;
    }

    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select("-password -refreshToken")
        .skip(skip)
        .limit(limit),
      User.countDocuments(query),
    ]);

    res.json({
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
        totalItems: totalUsers,
      },
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
