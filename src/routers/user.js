"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const user = require("../controllers/user");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//! URL: /users
router.route("/").get(permissions.isAdmin, user.list).post(user.create); //userCreate must Allow ANY

router
  .route("/:id")
  .get(permissions.isStaff || permissions.isAdmin, user.read)
  .put(permissions.isStaff || permissions.isAdmin, user.update)
  .patch(permissions.isStaff || permissions.isAdmin, user.update)
  .delete(permissions.isStaff || permissions.isAdmin, user.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
