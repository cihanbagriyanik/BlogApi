"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const auth = require("../controllers/auth");

/* -------------------------------------------------------------------------- */
//! URL: /auth
router.post("/login", auth.login);
router.post("/register", auth.login);
router.post("/refresh", auth.refresh);

router.get("/logout", auth.logout);

/* -------------------------------------------------------------------------- */
module.exports = router;
