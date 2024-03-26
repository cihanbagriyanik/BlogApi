"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Comment = require("../models/comment");

/* -------------------------------------------------------------------------- */
//? Comment CONTROLLER
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "List Comments"
        #swagger.description = `
            You can use filter[] & search[] & sort[] & page & limit queries with endpoint.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                <li>URL/?<b>limit=10&page=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(Comment);

    res.status(200).send({
      error: false,
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Create Comment"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "blogId": "65343222b67e9681f937f201",
                    "userId": "65343222b67e9681f937f201",
                    "name": "Comment 1"
                }
            }
    */

    // Add logined userId to req.body:
    req.body.userId = req.user._id;

    const data = await Comment.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Get Single Comment"
    */

    const data = await Comment.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Update Comment"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "blogId": "65343222b67e9681f937f201",
                    "userId": "65343222b67e9681f937f201",
                    "name": "Comment 1"
                }
          }
    */

    const data = await Comment.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      newData: await Comment.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Comments"]
        #swagger.summary = "Delete Comment"
    */

    const data = await Comment.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
      data,
    });
  },
};
