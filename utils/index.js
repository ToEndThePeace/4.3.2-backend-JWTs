const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/constants");

module.exports = {
  createToken,
};

function createToken(user) {
  console.log(user);
  const { id, username, department } = user;
  const payload = {
    id,
    username,
    department,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, jwt_secret, options);
}
