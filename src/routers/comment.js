"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Comment = require("../controllers/comment");

/* -------------------------------------------------------------------------- */
//? BlogComment:
router.route("/").get(Comment.list).post(Comment.create);

router
  .route("/:id")
  .get(Comment.read)
  .put(Comment.update)
  .patch(Comment.update)
  .delete(Comment.delete);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
