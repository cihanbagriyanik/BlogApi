"use strict";

/* -------------------------------------------------------------------------- //
    *BLOGAPP API Project USER MODELS
/* -------------------------------------------------------------------------- */

// IMPORT Mongoose
const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
//? Password Encrypt:
const passwordEncrypt = require("../helpers/passwordEncrypt");

/* -------------------------------------------------------------------------- */
// Schema:
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: [true, "There is this email. Email field must be unique."],
      required: [true, "Email field required."],
      validate: [
        (email) => {
          const emailRegexCheck =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegexCheck.test(email);
        },
        "Email type is not correct.",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
          ? passwordEncrypt(password)
          : "wrong",
      validate: (password) => (password == "wrong" ? false : true),
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },
  },

  {
    collection: "users",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
// Export
module.exports = {
  User: mongoose.model("User", UserSchema),
};
/* -------------------------------------------------------------------------- */
