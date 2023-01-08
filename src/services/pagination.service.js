const checkPagination = (req, res, next) => {
  if (req.query.page === undefined || req.query.count === undefined) {
    return res
      .status(400)
      .json({ success: false, msg: "pagination parameters are missing" });
  }
  if (req.query.page === 0 || req.query.count === 0) {
    return res
      .status(400)
      .json({ success: false, msg: "zeroes aren't allowed" });
  }
  req.query.skip = (req.query.page - 1) * req.query.count;
  req.query.skip = Number(req.query.skip);
  req.query.count = Number(req.query.count);
  next();
};

module.exports = checkPagination;
