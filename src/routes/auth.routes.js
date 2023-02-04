const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res, next) => {
    console.log("google called back!!", req.user);
    return res.status(200).json({
      success: true,
      message: req.user,
    });
  }
);
router.get("/logout");
router.get("/failure", (req, res) => {
  res.status(401).send("Failure to log in!");
});

module.exports = router;
