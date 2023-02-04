const authServices = require("./auth.service");

const createUserAccount = async (req, res, next) => {
  try {
    const request = await authServices.createUserAccount(req.body);

    if (request.err) {
      return res.status(request.status).json({
        success: false,
        message: request.err,
      });
    }

    return res.status(201).json({
      success: true,
      message: request,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const request = await authServices.signin(req.body);

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

const socialSignup = async (req, res, next) => {
  try {
    const request = await authServices.socialSignup(req.body);

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

const verifySocialAuthToken = async (req, res, next) => {
  const idToken = req.body.idToken;
  let request = await authServices.verifySocialAuthToken(idToken);

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
};
module.exports = {
  createUserAccount,
  signin,
  socialSignup,
  verifySocialAuthToken,
};
