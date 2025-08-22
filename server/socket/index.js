const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

let io;

const initSocket = (server, allowedOrigins) => {
  io = new Server(server, {
    cors: { origin: allowedOrigins, credentials: true },
  });

  // Socket middleware for JWT auth
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.userId}`);
    socket.join(`user_${socket.user.userId}`);

    // Add to cart
    socket.on("cart:add", async ({ productId, quantity }) => {
      let cart = await Cart.findOne({ userId: socket.user.userId });

      if (!cart) {
        cart = new Cart({ userId: socket.user.userId, items: [] });
      }

      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();

      io.to(`user_${socket.user.userId}`).emit("cart:updated", cart);
    });

    // Remove from cart
    socket.on("cart:remove", async ({ productId }) => {
      let cart = await Cart.findOne({ userId: socket.user.userId });
      if (!cart) return;

      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );

      await cart.save();

      io.to(`user_${socket.user.userId}`).emit("cart:updated", cart);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.userId}`);
    });
  });
};

module.exports = { initSocket, getIO: () => io };
