const cloudinary = require("../utils/cloudinary");
const User = require("../models/userModel");
const Profile = require("../models/profile");
/**
 * @route api/feed/hakkimda
 */

exports.showHakkimda = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};
