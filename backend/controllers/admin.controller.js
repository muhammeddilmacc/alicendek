const cloudinary = require("../utils/cloudinary");
const Post = require("../models/postModel");
const Category = require("../models/category");
const User = require("../models/userModel");
const Profile = require("../models/profile");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;




/**
 * @route api/admin/post/create-post  --create post
 */
exports.createPost = async (req, res, next) => {
  const { title, content, postedBy, type, image, likes, comments } = req.body;

  try {
    //upload image in cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "posts",
      width: 1200,
      crop: "scale",
    });

    // CHECK THE CATEGORY
    let category = await Category.findOne({ name: type });
    if (!category) {
      category = await Category.create({ name: type });
    }
    // CREATE POST
    const post = await Post.create({
      title,
      content,
      postedBy: req.user._id,
      category: category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};




/**
 * @route api/admin/anasayfa  --get all posts
 */
exports.showAdminPosts = async (req, res, next) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("postedBy", "name");
      res.status(201).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };


/**
 * @route api/admin/yazilar  --get all Yazılar
 */
exports.showAdminYazilar = async (req, res, next) => {
    try {
      const categori = await Category.findOne({ name: "Yazılar" });
      const posts = await Post.find({ category: categori._id })
        .sort({ createdAt: -1 })
        .populate("postedBy", "name");
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * @route api/admin/siirler  --get all Şiirler
 */
exports.showAdminSiirler = async (req, res, next) => {
    try {
      const categori = await Category.findOne({ name: "Şiirler" });
      const posts = await Post.find({ category: categori._id })
        .sort({ createdAt: -1 })
        .populate("postedBy", "name");
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * @route api/admin/makaleler  --get all Makaleler
 */
exports.showAdminMakaleler = async (req, res, next) => {
    try {
      const categori = await Category.findOne({ name: "Makaleler" });
      const posts = await Post.find({ category: categori._id })
        .sort({ createdAt: -1 })
        .populate("postedBy", "name");
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * @route api/admin/gundeme-dair  --get all Gündeme Dair
 */
exports.showAdminGundemeDair = async (req, res, next) => {
    try {
      const categori = await Category.findOne({ name: "Gündeme Dair" });
      const posts = await Post.find({ category: categori._id })
        .sort({ createdAt: -1 })
        .populate("postedBy", "name");
      res.status(200).json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  };


/**
 * @route api/admin/profile  --get profile
 */
exports.getProfile = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findById(user.profile);
      res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      next(error);
    }
  };


/**
 * @route api/admin/profile/update/:id  --update profile
 */
exports.updateProfile = async (req, res, next) => {
    const { name, profession, email, content, phone } = req.body;
  
    try {
      // check if there exist a profile
      let profile = await Profile.findOne();
  
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
        profile = await Profile.findOneAndUpdate( req.body, {
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
  
