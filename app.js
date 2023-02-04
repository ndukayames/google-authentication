const express = require("express");
const helmet = require("helmet");
const testRouter = require("./src/routes/test.routes");
const authRouter = require("./src/routes/auth.routes");
const v1Router = require("./src/routes/v1.routes");
const path = require("path");

const cookieSession = require("cookie-session");
const cors = require("cors");

const startDB = require("./src/config/mongodb.config");
const errorHandler = require("./src/services/errorHandler.service");

require("dotenv").config({
  path: __dirname + `/.env.${process.env.NODE_ENV}`,
  debug: true,
});
const passport = require("passport");
const admin = require("firebase-admin");

var serviceAccount = require("./public/the-clout-2ab75-firebase-adminsdk-ct01r-96d94e7ec8.json");

require("./src/config/passportConfig")(passport);

// start db
startDB();

const fbApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
// parse application/json
app.use(express.json());

app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 60 * 60 * 600 * 1000,
    keys: [process.env.SESSION_KEY],
  })
);
app.use(
  cors({
    origin: "*",
  })
);
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
