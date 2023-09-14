const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const Profile = require("../models/profile");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    // create user
    const user = await User.create(req.body);

    //creta default profile
    const profile = await Profile.create(req.body);
    user.profile = profile._id;
    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorResponse("please add an email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  const options = { maxAge: 60 * 60 * 1000, httpOnly: true };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(codeStatus).cookie("token", token, options).json({
    success: true,
    id: user._id,
    role: user.role,
  });
};

//log out
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

//user profile
exports.userProfile = async (req, res, next) => {
  console.log("user: ",req.user)
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
