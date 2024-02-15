"use strict";

/* -------------------------------------------------------------------------- //

    BLOGAPP API Project BLOG MODELS

/* -------------------------------------------------------------------------- */

//* Models
// IMPORT Mongoose
const mongoose = require("mongoose");

//! https://mongoosejs.com/docs/models.html

//? BlogCategory:
const BlogCategorySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "It must to be sent."],
    },
  },

  {
    collection: "blogCategories",
    timestamps: true,
  }
);

//? BlogPost:
const BlogPostSchema = new mongoose.Schema(
  {
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey - // Relational ID
      ref: "BlogCategory",
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
    collection: "blogPost",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
// Export
module.exports = {
  BlogCategory: mongoose.model("BlogCategory", BlogCategorySchmea),
  BlogPost: mongoose.model("BlogPost", BlogPostSchema),
};
