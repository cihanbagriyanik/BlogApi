"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Flight API
----------------------------------------------------------------------------- */
//? Requaring
const Token = require("../models/token");

/* -------------------------------------------------------------------------- */
//? Token Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    // #swagger.ignore = true

    const data = await res.getModelList(Token);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    // #swagger.ignore = true

    const data = await Token.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
