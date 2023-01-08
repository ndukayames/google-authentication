const express = require("express");
const helmet = require("helmet");
const testRouter = require("./src/routes/test.routes");
const authRouter = require("./src/routes/auth.routes");
const v1Router = require("./src/routes/v1.routes");
const path = require("path");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { Strategy } = require("passport-google-oauth20");

const startDB = require("./src/config/mongodb.config");
const errorHandler = require("./src/services/errorHandler.service");

require("dotenv").config({
  path: __dirname + `/.env.${process.env.NODE_ENV}`,
  debug: true,
});

// start db
startDB();

const app = express();
// parse application/json
app.use(express.json());

const authConfig = {
  clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH2_SECRET,
  callbackURL: "https://localhost:8000/auth/google/callback",
};

function verifyCallback(accessToken, refreshToken, profile, done) {
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

app.use("*", (req, res, next) => {
  console.log("a request came in");
  next();
});

app.use("/test", testRouter);
app.use("/auth", authRouter);
app.use("/api/v1", v1Router);

app.use(express.static(path.join(__dirname, "public")));
// global error handler
app.use(errorHandler);

module.exports = app;
