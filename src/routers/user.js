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
  .get(permissions.isStaffOrisAdmin, user.read)
  .put(permissions.isStaffOrisAdmin, user.update)
  .patch(permissions.isStaffOrisAdmin, user.update)
  .delete(permissions.isStaffOrisAdmin, user.delete);

/* -------------------------------------------------------------------------- */
module.exports = router;
