const express = require("express");
const helmet = require("helmet");
const testRouter = require("./src/routes/test.routes");
const authRouter = require("./src/routes/auth.routes");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const app = express();

const authConfig = {
  clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH2_SECRET,
  callbackURL: "https://localhost:8000/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("google profile", profile);
  done(null, profile);
}

passport.use(new Strategy(authConfig, verifyCallback));
app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 60 * 60 * 600 * 1000,
    keys: [process.env.SESSION_KEY],
  })
);
app.use(passport.initialize());

app.use("/test", testRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "public")));
app.get("/*", (req, res, next) => {});

module.exports = app;
