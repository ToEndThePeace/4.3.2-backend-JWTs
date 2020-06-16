// Middleware Imports
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const restricted = require("../auth/restricted-middleware");

// Server Creation
const server = express();

// Middleware
server.use(cors());
server.use(express.json());
server.use(helmet());

// Routers
const authRouter = require("../auth/auth-router");
const userRouter = require("../users/users-router");
server.use("/api/users", restricted, userRouter);
server.use("/api", authRouter);

// Test Endpoint
server.get("/", (req, res) => {
  res.status(200).json({ message: "Server running!" });
});

// Server Export
module.exports = server;
