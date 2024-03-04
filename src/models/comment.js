"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//   "blogId": "65343222b67e9681f937f201",
//   "userId": "65343222b67e9681f937f201",
//   "comment": "Comment 1"
// }
/* -------------------------------------------------------------------------- */
//? BlogComment:
const CommentSchmea = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comment: {
      type: String,
      trim: true,
      required: [true, "You should write your comment."],
    },
  },

  {
    collection: "comments",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Comments", CommentSchmea);
