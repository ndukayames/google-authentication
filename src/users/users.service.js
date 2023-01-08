const User = require("../models/user.model");

const getMyProfileDetails = async (email) => {
  // find user by email
  let user = await User.findOne({ email }).select("-password");
  return user;
};

const editMyProfileDetails = async (user, newProfileDetails) => {
  const { firstName, lastName, phoneNumber, email, password1, password2 } =
    newProfileDetails;

  if (firstName) {
    user.first_name = firstName;
  }
  if (lastName) {
    user.last_name = lastName;
  }
  if (phoneNumber) {
    user.phone_number = phoneNumber;
  }
  if (email) {
    user.email = email;
  }
  if (password1 && password2) {
    if (password1 === password2) {
      user.password = password1;
    } else {
      return { err: "Passwords don't match", status: 400 };
    }
  }
  await user.save();
  user.password = undefined;
  return user;
};

const getAllUsers = async (pageData, filters) => {
  const users = await User.find({})
    .sort("_id")
    .skip(pageData.skip)
    .limit(pageData.count);

  return users;
};

const getUserDetailsByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  console.log(user);
  if (!user) {
    return { err: "This user doesn't exist", status: 400 };
  }
  user.password = undefined;

  return user;
};

const deleteMyProfile = async (userId) => {
  const deleteOp = await User.deleteOne({ _id: userId });

  if (deleteOp.deletedCount !== 1) {
    return { err: "Encountered an error while deleting", status: 400 };
  }
  return "Account deleted successfully";
};
module.exports = {
  getMyProfileDetails,
  editMyProfileDetails,
  getAllUsers,
  getUserDetailsByEmail,
  deleteMyProfile,
};
