const express = require("express");
const verifyJWT = require("../services/authorization.service");
const {
  getMyProfileDetails,
  editMyProfileDetails,
  getAllUsers,
  getUserDetailsByEmail,
  deleteMyProfile,
} = require("./user.controller");
const checkPagination = require("../services/pagination.service");

const Router = express.Router();
Router.get("/me", verifyJWT, getMyProfileDetails);
Router.put("/", verifyJWT, editMyProfileDetails);
Router.get("/", verifyJWT, checkPagination, getAllUsers);
Router.get("/:userEmail", verifyJWT, getUserDetailsByEmail);
Router.delete("/me", verifyJWT, deleteMyProfile);

module.exports = Router;
