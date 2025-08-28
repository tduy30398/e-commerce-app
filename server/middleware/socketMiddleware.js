const jwt = require("jsonwebtoken");

const socketMiddleware = (socket, next) => {

  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("No token"));
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
}

module.exports = socketMiddleware;