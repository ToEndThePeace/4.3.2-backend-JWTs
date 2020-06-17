const router = require("express").Router();
const Users = require("../users/users-model");

router.get("/", (req, res) => {
  const { department: dpt } = req.decodedToken;
  console.log(req.decodedToken);
  Users.find(dpt)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to retrieve users" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => {
      if (user) res.status(200).json(user);
      else res.status(404).json({ message: "Invalid user ID" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to retrieve user" });
    });
});

module.exports = router;
