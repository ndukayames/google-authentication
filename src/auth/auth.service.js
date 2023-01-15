const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateJWT = require("../services/jwt.service");

const createUserAccount = async (newUserObj) => {
  const { firstName, lastName, email, phoneNumber, password1, password2 } =
    newUserObj;

  // check if account exists
  let user = await User.findOne({
    email: email,
  });

  if (user) {
    return { err: "This account already exists", status: 400 };
  }

  // check if password1 and password2 matches
  if (password1 !== password2) {
    return { err: "Your passwords do not match", status: 400 };
  }

  let newUser = new User({
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    password: password1,
  });
  await newUser.save();

  return "Signup Successful";
};

const signin = async (signinObj) => {
  // find user
  const { email, password } = signinObj;
  let user = await User.findOne({ email });
  if (!user) {
    return { err: "This email does not belong to any account", status: 400 };
  }

  // compare password
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { err: "Incorrect password", status: 400 };
  }

  return generateJWT(user);
};

module.exports = {
  createUserAccount,
  signin,
};
