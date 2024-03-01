"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Blog = require("../models/blog");

/* -------------------------------------------------------------------------- */
//? Blog CONTROLLER
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "List Blogs"
        #swagger.description = `
            You can send query with endpoint for search[], sort[], page and limit.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                <li>URL/?<b>page=2&limit=1</b></li>
            </ul>
        `
    */

    const data = await res.getModelList(Blog, "categoryId");

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog),
      data: data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Create Blog"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "categoryId": "65343222b67e9681f937f101",
                    "title": "Blog Title 1",
                    "content": "Blog Content 1",
                    "image": "http://imageURL",
                    "isPublish": true
                }
            }
    */

    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
    */

    const data = await Blog.findOne({ _id: req.params.id }).populate(
      "categoryId"
    );

    res.status(200).send({
      error: false,
      data: data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Update Blog"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "categoryId": "65343222b67e9681f937f101",
                    "title": "Blog Title 1",
                    "content": "Blog Content 1",
                    "image": "http://imageURL",
                    "isPublish": true
                }
          }
    */

    const data = await Blog.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data: data,
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "Delete Category"
    */

    const data = await Blog.deleteOne({ _id: req.params.id });
    // console.log(data);

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
    });
  },
};
