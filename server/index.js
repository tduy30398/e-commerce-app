const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");

app.use(cookieParser());
app.use(express.json());

const authMiddleware = require("./middleware/authMiddleware");
const { initSocket } = require("./socket/index");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const reviewRoutes = require("./routes/review");
const cartRoutes = require("./routes/cart");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");
const uploadRoutes = require("./routes/upload");

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
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/chat", authMiddleware, chatRoutes);
app.use("/api/user", authMiddleware, userRoutes);

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/upload", uploadRoutes);

// Serve static uploads folder
// app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const server = http.createServer(app);

    // Initialize Socket.IO
    initSocket(server, allowedOrigins);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
