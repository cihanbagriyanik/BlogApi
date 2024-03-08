"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const router = require("express").Router();

const Like = require("../controllers/like");

/* -------------------------------------------------------------------------- */
//? BlogLike:
router.route("/:id/getLike").get(Like.read);

router.route("/:id/postLike").post(Like.create);

/* -------------------------------------------------------------------------- */
//? Export:
module.exports = router;
