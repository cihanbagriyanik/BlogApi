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
        #swagger.parameters['author'] = {
          in: 'query',
          name: 'author',
        }
        #swagger.description = `
            You can use filter[] & search[] & sort[] & page & limit queries with endpoint.
            <ul> Examples:
                <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                <li>URL/?<b>limit=10&page=1</b></li>
            </ul>
            You can use author=userId query for get all blogs of any user.
        `
    */

    // isPublish = true
    const filters = req.query?.author
      ? { userId: req.query.author }
      : { isPublish: true };

    const data = await res.getModelList(Blog, filters);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog, filters),
      data,
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

    // Add logined userId to req.body:
    req.body.userId = req.user?._id;

    const data = await Blog.create(req.body);

    res.status(201).send({
      error: false,
      // body: req.body,
      data,
    });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Single Blog"
    */

    const data = await Blog.findOne({ _id: req.params.id }).populate([
      { path: "userId", select: "username firstName lastName" },
      { path: "categoryId" },
      {
        path: "comments",
        populate: { path: "userId", select: "username firstName lastName" },
      },
    ]);

    // Visitor Counter for per IP:
    if (req.session?.visitorIp != req.ip) {
      req.session.visitorIp = req.ip;
      data.countOfVisitors++;
      data.save();
    }

    res.status(200).send({
      error: false,
      data,
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

    // Only owner:
    const filters =
      req.user && !req.user.isAdmin ? { userId: req.user._id } : {};

    const data = await Blog.updateOne(
      { _id: req.params.id, ...filters },
      req.body,
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Delete Blog"
    */

    // Only owner:
    const filters =
      req.user && !req.user.isAdmin ? { userId: req.user._id } : {};

    const data = await Blog.deleteOne({ _id: req.params.id, ...filters });
    // console.log(data);

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },

  /* -------------------------------------------------------------------------- */
  //! LIKES:
  getLike: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Get Like Info"
    */

    const userId = req.user?.id;

    const data = await Blog.findOne(
      { _id: req.params.id },
      { _id: 0, likes: 1 }
    );

    res.status(200).send({
      error: false,
      didUserLike: data.likes.includes(userId),
      countOfLikes: data.likes.length,
    });
  },

  postLike: async (req, res) => {
    /*
        #swagger.tags = ["Blogs"]
        #swagger.summary = "Add/Remove Like"
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {}
        }
    */

    const userId = req.user?.id;

    const data = await Blog.findOne({ _id: req.params.id });

    if (data.likes.includes(userId)) {
      data.likes.pull(userId);
    } else {
      data.likes.push(userId);
    }
    data.save();

    res.status(202).send({
      error: false,
      didUserLike: data.likes.includes(userId),
      countOfLikes: data.likes.length,
    });
  },
};
