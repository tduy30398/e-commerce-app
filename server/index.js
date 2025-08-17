const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const authMiddleware = require("./middleware/authMiddleware");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const reviewRoutes = require("./routes/review");

const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-tduy.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.send("Server is running");
});

// Protected routes
app.use("/api/profile", authMiddleware, profileRoutes);

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
