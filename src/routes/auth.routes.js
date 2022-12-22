const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/secret", (req, res) => {});
router.get("/google", passport.authenticate("google", { scope: ["email"] }));

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("google called back!!");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("google called back!!");
  }
);
router.get("/logout");
router.get("/failure", (req, res) => {
  res.status(401).send("Failure to log in!");
});

module.exports = router;
