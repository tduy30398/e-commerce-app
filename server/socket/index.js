const { Server } = require("socket.io");
// const { createAdapter } = require("@socket.io/redis-adapter");
// const { createClient } = require("redis");

const Cart = require("../models/Cart");
const Message = require("../models/Message");

const socketMiddleware = require("../middleware/socketMiddleware");
const rateLimiter = require("../middleware/socketRateLimiter");

let io;

const initSocket = (server, allowedOrigins) => {
  io = new Server(server, {
    cors: { origin: allowedOrigins, credentials: true },
  });

  // const pubClient = createClient({ url: process.env.REDIS_URL });
  // const subClient = pubClient.duplicate();

  // await pubClient.connect();
  // await subClient.connect();

  // io.adapter(createAdapter(pubClient, subClient));

  // Socket middleware for JWT auth
  io.use(socketMiddleware);

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.user.userId}`);
    socket.join(`user_${socket.user.userId}`);

    // Add to cart
    socket.on("cart:add", async ({ productId, quantity, color, size }) => {
      let cart = await Cart.findOne({ userId: socket.user.userId });

      if (!cart) {
        cart = new Cart({ userId: socket.user.userId, items: [] });
      }

      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.color = color;
        existingItem.size = size;
      } else {
        cart.items.push({ productId, quantity, color, size });
      }

      await cart.save();

      await cart.populate("items.productId");

      io.to(`user_${socket.user.userId}`).emit("cart:updated", cart);
    });

    // Remove from cart
    socket.on("cart:remove", async ({ productIds }) => {
      let cart = await Cart.findOne({ userId: socket.user.userId });
      if (!cart) return;

      cart.items = cart.items.filter(
        (item) => !productIds.includes(item.productId.toString())
      );

      await cart.save();

      await cart.populate("items.productId");

      io.to(`user_${socket.user.userId}`).emit("cart:updated", cart);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.userId}`);
    });
  });

  const chatNsp = io.of("/chat");

  chatNsp.use(socketMiddleware);

  chatNsp.on("connection", (socket) => {
    console.log(
      `💬 Chat connected: ${socket.user.userId}, role: ${socket.user.role}`
    );

    rateLimiter(socket, 10, 10000);

    if (socket.user.role === "admin") {
      socket.join("admins");
    } else {
      socket.join(`user_${socket.user.userId}`);
    }

    // User sends message
    socket.on("message", async ({ to, content, type }) => {
      const msg = {
        from: socket.user.userId,
        to,
        content,
        type: type || "text",
      };

      const savedMessage = await Message.create(msg);

      if (socket.user.role === "user") {
        // Send to all admins
        chatNsp.to("admins").emit("message", savedMessage);
      } else {
        // Admin sends to specific user
        chatNsp.to(`user_${to}`).emit("message", savedMessage);
      }

      // Also send back to sender (so they see their own message instantly)
      socket.emit("message", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Chat disconnected: ${socket.user.userId}`);
    });
  });
};

module.exports = { initSocket };
