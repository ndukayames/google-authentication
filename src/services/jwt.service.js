const jwt = require("jsonwebtoken");

function generateJWT(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "365d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = generateJWT;
