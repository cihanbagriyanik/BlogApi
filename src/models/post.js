"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
//? Post:
const PostSchema = new mongoose.Schema(
  {
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

    published: {
      type: Boolean,
      default: true,
    },
  },

  {
    collection: "posts",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Post", PostSchema);
