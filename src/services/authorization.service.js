const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

async function verifyJWT(req, res, next) {
  try {
    const header = req.headers["authorization"];

    if (header) {
      if (!req.headers.authorization.startsWith("Bearer")) {
        {
          return res.status(403).json({
            success: false,
            msg: "Invalid access token.",
            // status: 401,
          });
        }
      }
    } else {
      res.status(403).json({
        success: false,
        msg: "Access token not found in header.",
        // status: 401,
      });
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
  } catch (error) {
    next(error);
  }
}

module.exports = verifyJWT;
