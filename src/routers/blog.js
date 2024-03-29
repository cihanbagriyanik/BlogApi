"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Blog = require("../controllers/blog");

const permissions = require("../middlewares/permissions");

/* -------------------------------------------------------------------------- */
//? Blog Router:
//! URL : /blogs

router.route("/").get(Blog.list).post(permissions.isLogin, Blog.create);

router
  .route("/:id")
  .get(permissions.isLogin, Blog.read)
  .put(permissions.isLogin, Blog.update)
  .patch(permissions.isLogin, Blog.update)
  .delete(permissions.isLogin, Blog.delete);

//? Blog Like Router
router.route("/:id/getlike").get(Blog.listLike);

router.route("/:id/postlike").post(permissions.isLogin, Blog.createLike);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
