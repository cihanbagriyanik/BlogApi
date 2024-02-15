"use strict";

/* -------------------------------------------------------
    * BLOG API PROJECT (USER CONTROLLER)
------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
//? IMPORT User from UserModel:
const { User } = require("../models/userModel");

/* -------------------------------------------------------------------------- */
//? Password Encrypt:
const passwordEncrypt = require("../helpers/passwordEncrypt");

/* -------------------------------------------------------------------------- */
//? Blog USER CONTROLLER
module.exports.User = {
  //! GET
  list: async (req, res) => {
    const data = await res.getModelList(User);

    res.status(200).send({
      error: false,
      data: data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },

  //! /:userId -> GET
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      data: data,
    });
  },

  //! /:userId -> PUT / PATCH
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);

    res.status(202).send({
      error: false,
      data,
      newData: await User.findOne({ _id: req.params.userId }),
    });
  },

  //! /:userId -> DELETE
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
      data,
    });
  },

  //! Login/Logout Processes:
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email: email });

      if (user && passwordEncrypt(password) == user.password) {
        // Email & Password : true

        /* -------------------------------------------------------------------------- */
        //* Cookiesnode
        // Set Sessions:
        req.session = {
          email: user.email,
          password: user.password,
        };
        // Remind Me:
        // Set Cookie:
        if (req.body.remindMe) {
          req.session.remindMe = true;
          // Set MaxAge foir user/login:
          req.sessionOptions.maxAge = 1000 * 60; // 1dk // 1000 * 60 * 60 (1 Saat) // 1000 * 60 * 60 * 24 (1 gun) // 1000 * 60 * 60 * 24 * 3 (3 Gun)
        }
        /* -------------------------------------------------------------------------- */
        res.status(200).send({
          error: false,
          message: "Logined",
          section: req.section,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },

  logout: async (req, res) => {
    // Session destroy:
    req.session = null;

    res.status(200).send({
      error: false,
      message: "Logout OK",
      session: req.session,
    });
  },
};
