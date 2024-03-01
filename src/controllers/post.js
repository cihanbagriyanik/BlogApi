"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Post = require("../models/post");

/* -------------------------------------------------------------------------- */
//? POST CONTROLLER
module.exports = {
  //! GET
  list: async (req, res) => {
    const data = await res.getModelList(Post, "blogCategoryId");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Post),
      data: data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    const data = await Post.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },

  //! /:postId -> GET
  read: async (req, res) => {
    const data = await Post.findOne({ _id: req.params.postId }).populate(
      "blogCategoryId"
    );

    res.status(200).send({
      error: false,
      data: data,
    });
  },

  //! /:postId -> PUT / PATCH
  update: async (req, res) => {
    const data = await Post.updateOne({ _id: req.params.postId }, req.body);

    res.status(202).send({
      error: false,
      data: data,
    });
  },

  //! /:postId -> DELETE
  delete: async (req, res) => {
    const data = await Post.deleteOne({ _id: req.params.postId });
    // console.log(data);

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
    });
  },
};
