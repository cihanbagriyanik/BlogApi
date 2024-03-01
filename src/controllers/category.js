"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Category = require("../models/category");

/* -------------------------------------------------------------------------- */
//? Blog Category CONTROLLER
module.exports = {
  //! GET
  list: async (req, res) => {
    const data = await res.getModelList(Category);

    res.status(200).send({
      error: false,
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    const data = await Category.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    const data = await Category.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    const data = await Category.updateOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(202).send({
      error: false,
      data,
      newData: await Category.findOne({ _id: req.params.categoryId }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    const data = await Category.deleteOne({ _id: req.params.categoryId });

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
      data,
    });
  },
};
