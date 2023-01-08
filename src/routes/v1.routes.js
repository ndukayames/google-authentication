const Router = require("express").Router;

const authRouter = require("../auth/auth.route");
const userRouter = require("../users/users.routes");

const router = new Router();

router.use("*", (req, res, next) => {
  console.log("a request came in to the v1 route");
  next();
});
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
