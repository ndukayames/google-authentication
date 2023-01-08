const express = require("express");
const { createUserAccount, signin } = require("./auth.controller");
const verifyJWT = require("../services/authorization.service");

const Router = express.Router();

Router.post("/signup", createUserAccount);
Router.post("/signin", signin);

module.exports = Router;
