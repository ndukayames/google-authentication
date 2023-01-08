const userServices = require("./users.service");
const getMyProfileDetails = async (req, res, next) => {
  try {
    const request = await userServices.getMyProfileDetails(req.user.email);

    return res.status(200).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};
const editMyProfileDetails = async (req, res, next) => {
  try {
    const request = await userServices.editMyProfileDetails(req.user, req.body);

    if (request.err) {
      return res.status(request.status).json({
        success: false,
        message: request.err,
      });
    }

    return res.status(200).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const request = await userServices.getAllUsers(req.query);

    return res.status(200).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetailsByEmail = async (req, res, next) => {
  try {
    const request = await userServices.getUserDetailsByEmail(
      req.params.userEmail
    );
    if (request.err) {
      return res.status(request.status).json({
        success: false,
        message: request.err,
      });
    }

    return res.status(200).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMyProfile = async (req, res, next) => {
  try {
    const request = await userServices.deleteMyProfile(req.user._id);

    if (request.err) {
      return res.status(request.status).json({
        success: false,
        message: request.err,
      });
    }

    return res.status(200).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getMyProfileDetails,
  editMyProfileDetails,
  getAllUsers,
  getUserDetailsByEmail,
  deleteMyProfile,
};
