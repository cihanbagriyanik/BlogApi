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

    const modifiedData = data.map((blog) => ({
      _id: blog._id, // _id özelliğini kopyala
      userId: blog.userId,
      categoryId: blog.categoryId,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      isPublish: blog.isPublish,
      comments: blog.comments,
      likes: blog.likes,
      countOfVisitors: blog.countOfVisitors,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog, filters),
      data: modifiedData,
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

    if (!data) {
      // Eğer blog bulunamadıysa, boş bir nesne dön
      return res.status(404).send({
        error: true,
        message: "Blog not found",
        data: {},
      });
    }

    // console.log(data);
    /* -------------------------------------------------------------------------- */
    // Check if the user's ID is already in visitedUsers array
    // if (!data.visitedUsers.includes(req.user._id)) {
    if (
      data.visitedUsers &&
      Array.isArray(data.visitedUsers) &&
      !data.visitedUsers.includes(req.user._id)
    ) {
      // If not, push the user's ID to visitedUsers array
      data.visitedUsers.push(req.user._id);

      // Increment countOfVisitors for the blog
      data.countOfVisitors++;

      // Save the changes
      await data.save();
    }

    // Check if the user has visited this blog before
    // if (!req.user.visitedBlogs.includes(req.params.id)) {
    if (
      req.user?.visitedBlogs &&
      Array.isArray(req.user.visitedBlogs) &&
      !req.user?.visitedBlogs.includes(req.params.id)
    ) {
      // If not, mark the blog as visited for this user
      req.user.visitedBlogs.push(req.params.id);

      // Save the changes to the user model
      await req.user.save();
    }

    /* -------------------------------------------------------------------------- */

    //! Count of visitor icin sonra edit lenecek...
    //* Visitor Counter for per IP:
    // if (req.session?.visitorIp != req.ip) {
    //   req.session.visitorIp = req.ip;
    //   data.countOfVisitors++;
    //   data.save();
    // }
    //! Count of visitor icin sonra edit lenecek...
    /* -------------------------------------------------------------------------- */
    // console.log(req.ip);
    // console.log(req.session.visitorIp);

    // if (!req.session.visitedBlogs) {
    //   req.session.visitedBlogs = []; // Eğer ziyaret edilen bloglar için bir dizi yoksa, boş bir dizi oluştur
    //   console.log("xxxxxxxx:" + req.session.visitedBlogs);
    // }

    // if (
    //   req.session.visitorIp !== req.ip &&
    //   !req.session.visitedBlogs.includes(data.blogId)
    // ) {
    //   req.session.visitorIp = req.ip;
    //   req.session.visitedBlogs.push(data.blogId); // Ziyaret edilen blogları listeye ekleyin
    //   data.countOfVisitors++;
    //   data.save();
    // }

    res.status(200).send({
      error: false,
      data: {
        _id: data._id,
        userId: data.userId,
        categoryId: data.categoryId,
        title: data.title,
        content: data.content,
        image: data.image,
        isPublish: data.isPublish,
        comments: data.comments,
        likes: data.likes,
        countOfVisitors: data.countOfVisitors,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  },

  /* -------------------------------------------------------------------------- */
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

    // Güncellenmiş blogu veritabanından al
    const updatedBlog = await Blog.findOne({ _id: req.params.id });

    const modifiedBlog = {
      userId: updatedBlog.userId,
      categoryId: updatedBlog.categoryId,
      title: updatedBlog.title,
      content: updatedBlog.content,
      image: updatedBlog.image,
      isPublish: updatedBlog.isPublish,
      comments: updatedBlog.comments,
      likes: updatedBlog.likes,
      countOfVisitors: updatedBlog.countOfVisitors,
      createdAt: updatedBlog.createdAt,
      updatedAt: updatedBlog.updatedAt,
    };

    res.status(202).send({
      error: false,
      data,
      new: modifiedBlog,
      // new: await Blog.findOne({ _id: req.params.id }),
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
  //! --------------------------------- LIKES --------------------------------- */

  //! GET
  listLike: async (req, res) => {
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

  //! POST
  createLike: async (req, res) => {
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
