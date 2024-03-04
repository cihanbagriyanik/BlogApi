"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

/* -------------------------------------------------------------------------- */
// {
//     "name": "Category 1",
// }
/* -------------------------------------------------------------------------- */
//? BlogCategory:
const CategorySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "You should write category name."],
    },
  },

  {
    collection: "categories",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("Categories", CategorySchmea);
