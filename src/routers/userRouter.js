"use strict";

/* -------------------------------------------------------
    * BLOG API PROJECT (USER ROUTERS)
------------------------------------------------------- */

//* Routers

// IMPORT Express and Router
const router = require("express").Router();

// IMPORT User from UserController:
const { User } = require("../controllers/userController");

/* -------------------------------------------------------------------------- */
//! URL: /user

router.post("/login", User.login);
router.get("/logout", User.logout);

router.route("/").get(User.list).post(User.create);

router
  .route("/:userId")
  .get(User.read)
  .put(User.update)
  .patch(User.update)
  .delete(User.delete);

// Export
module.exports = router;
