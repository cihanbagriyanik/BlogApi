"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Like = require("../models/like");

/* -------------------------------------------------------------------------- */
//? Like CONTROLLER
module.exports = {
  //! POST
  create: async (req, res) => {
    /*
          #swagger.tags = ["Blogs"]
          #swagger.summary = "Add/Remove Like"
          #swagger.parameters['body'] = {
                  in: 'body',
                  required: true,
                  schema: {}
              }
      */

    const data = await Like.create(req.body);

    res.status(202).send({
      error: false,
      body: req.body,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Like Info"
    */

    const data = await Like.findOne({ _id: req.params.id }).populate(
      "categoryId"
    );

    res.status(200).send({
      error: false,
      data,
    });
  },
};
