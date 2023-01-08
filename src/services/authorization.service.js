const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function verifyJWT(req, res, next) {
  const header = req.headers["authorization"];

  if (!header && !req.headers.authorization.startsWith("Bearer")) {
    return res
      .status(403)
      .send({ errors: [{ message: "Auth token is required" }] });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email) {
      // verify if user exists
      let user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          msg: "Unable to Authenticate",
          // status: 401,
        });
      }
      req.user = user;
    } else {
      return res.status(403).json({
        success: false,
        msg: "Session expired, you have to login.",
        // status: 401,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      msg: `${error.message}. Please login.`,
      // status: 401,
    });
  }
}

module.exports = verifyJWT;
