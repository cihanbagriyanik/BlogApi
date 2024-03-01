"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Post = require("../controllers/post");

/* -------------------------------------------------------------------------- */
//? BlogPost:
router.route("/posts").get(Post.list).post(Post.create);

router
  .route("/posts/:id")
  .get(Post.read)
  .put(Post.update)
  .patch(Post.update)
  .delete(Post.delete);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
