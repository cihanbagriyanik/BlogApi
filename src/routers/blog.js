"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Blog = require("../controllers/blog");

/* -------------------------------------------------------------------------- */
//? Blog Router:
//! URL : /blogs
router.route("/").get(Blog.list).post(Blog.create);

router
  .route("/:id")
  .get(Blog.read)
  .put(Blog.update)
  .patch(Blog.update)
  .delete(Blog.delete);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
