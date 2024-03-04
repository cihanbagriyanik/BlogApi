"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "title": "Blog Title 1",
//     "content": "Blog Content 1",
//     "content": "Blog Content 1",
//     "image": "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png",
//     "isPublish": true,
// }
/* -------------------------------------------------------------------------- */
//? Blog:
const BlogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      required: [true, "It must to be sent."],
    },

    content: {
      type: String,
      trim: true,
      required: [true, "It must to be sent."],
    },

    image: {
      type: String,
      trim: true,
      required: true,
    },

    isPublish: {
      type: Boolean,
      default: true,
    },

    comments: [
      {
        type: String,
        ref: "Comments",
      },
    ],

    likes: [
      {
        type: String,
        ref: "User",
      },
    ],

    countOfVisitors: {
      type: Number,
      default: 0,
    },
  },

  {
    collection: "blogs",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Blog", BlogSchema);
