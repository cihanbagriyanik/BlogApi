"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "userId": "65e61d0ce678a83f55347c70",
//     "categoryId": "65e61f5513d83183b6e5d00e",
//     "title": "Blog Title 1",
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
      ref: "Category",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    countOfVisitors: {
      type: Number,
      default: 0,
    },

    visitedUsers: {
      type: [],
      // select: false,
    },
  },

  {
    collection: "blogs",
    timestamps: true,
  }
);

// /* -------------------------------------------------------------------------- */
//! veriyi cikti vermeden hemen once manipulasyon:
// pre ,init, pre save,postsave ...
// BlogSchema.pre("init", function (document) {
//   document.__v = undefined; // görünümden kaldırır
//   document.visitedUsers = undefined; // görünümden kaldırır
// });

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Blog", BlogSchema);
