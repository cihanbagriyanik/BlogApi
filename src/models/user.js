"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const { mongoose } = require("../configs/dbConnection");

const passwordEncrypt = require("../helpers/passwordEncrypt");

/* -------------------------------------------------------------------------- */
// {
//     "username": "test",
//     "password": "1234",
//     "email": "test@site.com",
//     "firstName": "test",
//     "lastName": "test",
//     "isActive": true,
//     "isAdmin": false,
//     "isStaff": false
// }
/* -------------------------------------------------------------------------- */
//? User Model:
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email is required."],
      unique: [true, "That email is already taken. Try another."],
      validate: [
        (email) => {
          const regexEmailCheck =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return regexEmailCheck.test(email);
        },
        "Email type is not correct.",
      ],
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    image: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
