const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");
const Profile = require("../models/profile");
const User = require("../models/userModel");

//update profile
exports.updateProfile = async (req, res, next) => {
  const { name, profession, email, content, phone } = req.body;

  try {
    // check if there exist a profile
    console.log(req.params.id);
    let profile = await Profile.findById(req.params.id);

    if (!profile) {
      // CREATE POST
      profile = await Profile.create({
        name,
        surname,
        profession,
        email,
        phone,
        content,
      });
      res.status(201).json({
        success: true,
        profile,
      });
    } else {
      // update profile
      profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(201).json({
        success: true,
        profile,
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//get profile

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const profile = await Profile.findById(user.profile);
    console.log(user.profile)
    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};
