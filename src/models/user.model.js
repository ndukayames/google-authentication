const mongoose = require("mongoose");
// import mongoose from "mongoose";

const userSchema = require("../schemas/user.schema");

userSchema.virtual("fullName").get(function () {
  return this.first_name + " " + this.last_name;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
