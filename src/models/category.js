"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
//? BlogCategory:
const CategorySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "It must to be sent."],
    },
  },

  {
    collection: "categories",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Categories", CategorySchmea);
