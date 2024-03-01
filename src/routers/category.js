"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Category = require("../controllers/category");

/* -------------------------------------------------------------------------- */
//? BlogCategory:
router.route("/categories").get(Category.list).post(Category.create);

router
  .route("/categories/:id")
  .get(Category.read)
  .put(Category.update)
  .patch(Category.update)
  .delete(Category.delete);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
