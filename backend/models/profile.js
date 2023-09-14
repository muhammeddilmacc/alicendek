const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
     // required: [true, "Please add your name"],
    },

    profession: {
      type: String,
      trim: true,
    //  required: [true, "Please add your profession"],
      default: "Scientist"
    },

    email: {
      type: String,
      trim: true,
    //  required: [true, "Please add your email"],
      default: "example@email.com"
    },

    phone: {
      type: String,
      trim: true,
      default: "05555555555"
    },

    content: {
      type: String,
     // required: [true, "content is required"],
      default: "write your content here"
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
