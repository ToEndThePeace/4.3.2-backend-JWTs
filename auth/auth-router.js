// Router Initialization
const router = require("express").Router();

// Helper Imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isValid } = require("../users/users-service");
const Users = require("../users/users-model");
const { createToken } = require("../utils");

// Routes
router.post("/register", (req, res) => {
  const { body: credentials } = req;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;

    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ user });
      })
      .catch((err) => {
        res.status(500).json({ message: "Unable to create user" });
      });
  } else {
    res.status(400).json({ message: "Please provide proper credentials" });
  }
});

router.post("/login", (req, res) => {
  const { body: credentials } = req;
  const { username, password } = credentials;
  if (isValid(credentials)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ token });
        } else {
        res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Unable to complete your request" });
      });
  } else {
    res.status(400).json({ message: "Please provide a valid login" });
  }
});

// Router Export
module.exports = router;
