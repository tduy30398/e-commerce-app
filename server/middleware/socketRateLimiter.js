const rateLimiter = (socket, limit = 10, intervalMs = 10000) => {
  let events = 0;
  let lastReset = Date.now();

  socket.use((_, next) => {
    const now = Date.now();

    // reset counter every interval
    if (now - lastReset > intervalMs) {
      events = 0;
      lastReset = now;
    }

    events++;

    if (events > limit) {
      console.warn(`Rate limit exceeded by ${socket.id}`);
      return next(new Error("Rate limit exceeded"));
    }

    next();
  });
};

// IP-Based Rate Limiting
// const ipRequests: Record<string, { count: number; lastReset: number }> = {};

// function ipRateLimiter(socket, limit = 10, intervalMs = 10000) {
//   const ip = socket.handshake.address;

//   socket.use((_, next) => {
//     const now = Date.now();
//     const entry = ipRequests[ip] || { count: 0, lastReset: now };

//     if (now - entry.lastReset > intervalMs) {
//       entry.count = 0;
//       entry.lastReset = now;
//     }

//     entry.count++;
//     ipRequests[ip] = entry;

//     if (entry.count > limit) {
//       console.warn(`IP ${ip} exceeded rate limit`);
//       return next(new Error("Too many requests from this IP"));
//     }

//     next();
//   });
// }

// Redis-Backed Rate Limiting (for multi-instance scaling)
// import { RateLimiterRedis } from "rate-limiter-flexible";
// import { createClient } from "redis";

// const redisClient = createClient({ url: "redis://localhost:6379" });
// await redisClient.connect();

// const rateLimiter = new RateLimiterRedis({
//   storeClient: redisClient,
//   keyPrefix: "socket_rate",
//   points: 10, // 10 events
//   duration: 10, // per 10 seconds
// });

// io.on("connection", (socket) => {
//   socket.use(async (packet, next) => {
//     try {
//       await rateLimiter.consume(socket.handshake.address);
//       next();
//     } catch {
//       return next(new Error("Rate limit exceeded"));
//     }
//   });
// });

module.exports = rateLimiter;
