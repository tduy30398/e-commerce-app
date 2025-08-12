const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is undefined");
  process.exit(1);
}

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "30m",
  });
  const refreshToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "8h",
  });
  return { accessToken, refreshToken };
};

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, birthday } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists)
      return res
        .status(400)
        .json({ message: "User already exists", field: "email" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      birthday,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Can't find email", field: "email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Wrong password", field: "password" });

    const { accessToken, refreshToken } = generateTokens(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/refresh-token", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30m",
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await User.findOneAndUpdate(
        { refreshToken },
        { $set: { refreshToken: null } }
      );
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
