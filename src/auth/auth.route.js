const express = require("express");
const {
  createUserAccount,
  signin,
  socialSignup,
  verifySocialAuthToken,
} = require("./auth.controller");

const Router = express.Router();

Router.post("/signup", createUserAccount);
Router.post("/social-signup", socialSignup);

Router.post("/verify-token", verifySocialAuthToken);

Router.post("/signin", signin);

module.exports = Router;
