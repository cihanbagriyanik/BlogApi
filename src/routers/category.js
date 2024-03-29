"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Category = require("../controllers/category");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//? BlogCategory:
router
  .route("/")
  .get(Category.list)
  .post(permissions.isAdmin || permissions.isStaff, Category.create);

router
  .route("/:id")
  .get(Category.read)
  .put(permissions.isAdmin || permissions.isStaff, Category.update)
  .patch(permissions.isAdmin || permissions.isStaff, Category.update)
  .delete(permissions.isAdmin || permissions.isStaff, Category.delete);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
