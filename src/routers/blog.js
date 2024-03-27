"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Blog = require("../controllers/blog");

const {isLogin} = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//? Blog Router:
//! URL : /blogs
router.use(isLogin);

router.route("/").get(Blog.list).post(Blog.create);

router
  .route("/:id")
  .get(Blog.read)
  .put(Blog.update)
  .patch(Blog.update)
  .delete(Blog.delete);

//? Blog Like Router
router.route("/:id/getlike").get(Blog.listLike);

router.route("/:id/postlike").post(Blog.createLike);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
