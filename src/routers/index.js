"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

/* -------------------------------------------------------------------------- */
//? Routes:
//! URL: /

// auth:
router.use("/auth", require("./auth"));

// token:
router.use("/tokens", require("./token"));

// user:
router.use("/users", require("./user"));

// category:
router.use("/categories", require("./category"));

// blog:
router.use("/blogs", require("./blog"));

// comment:
router.use("/comments", require("./comment"));

// document:
router.use("/documents", require("./document"));

/* -------------------------------------------------------------------------- */
module.exports = router;
