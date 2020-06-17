const router = require("express").Router();
const Users = require("../users/users-model");

router.get("/dept", (req, res) => {
  Users.getDepts()
    .then((depts) => {
      res.status(200).json(depts);
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to retrieve data" });
    });
});

module.exports = router;
