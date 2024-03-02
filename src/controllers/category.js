"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const Category = require("../models/category");

/* -------------------------------------------------------------------------- */
//? Category CONTROLLER
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "List Categories"
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

    const data = await res.getModelList(Category);

    res.status(200).send({
      error: false,
      data,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "Create Category"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Category 1"
                }
            }
    */

    const data = await Category.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "Get Single Category"
    */

    const data = await Category.findOne({ _id: req.params.categoryId });

    res.status(200).send({
      error: false,
      data,
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "Update Category"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "Category 1"
                }
          }
    */

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
    /*
        #swagger.tags = ["Categories"]
        #swagger.summary = "Delete Category"
    */

    const data = await Category.deleteOne({ _id: req.params.categoryId });

    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: false,
      data,
    });
  },
};
