const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ success: false, message: err, status: 400 });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res
      .status(400)
      .json({ success: false, message: err.message, status: 400 });
  }

  if (err.name === "CastError") {
    // mongoose cast error
    return res
      .status(400)
      .json({ success: false, message: err.message, status: 400 });
  }

  if (err.name === "Error") {
    // mongoose cast error
    return res
      .status(400)
      .json({ success: false, message: err.message, status: 400 });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token", status: 401 });
  }

  if (err.name === "TypeError") {
    // jwt authentication error
    return res
      .status(400)
      .json({ success: false, message: err.message, status: 400 });
  }

  if (err.status) {
    return res
      .status(err.status)
      .json({ success: false, message: err.err, status: err.status });
  }
  // default to 500 server error
  return res
    .status(500)
    .json({ success: false, message: "server error", status: 500 });
};

module.exports = errorHandler;
