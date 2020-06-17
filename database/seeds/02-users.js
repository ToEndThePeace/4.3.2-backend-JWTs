const bcryptjs = require("bcryptjs");
exports.seed = function (knex) {
  return knex("users").insert([
    {
      username: "brandon",
      password: bcryptjs.hashSync("myNewPass", 8),
      dept_id: 1,
    },
  ]);
};
