"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const User = require("../models/user");
const Token = require("../models/token");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
//? User Controller:
module.exports = {
  //! GET
  list: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "List Users"
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

    const data = await res.getModelList(User);

    const modifiedData = data.map((blog) => ({
      _id: blog._id,
      username: blog.username,
      password: blog.password,
      email: blog.email,
      firstName: blog.firstName,
      lastName: blog.lastName,
      image: blog.image,
      city: blog.city,
      bio: blog.bio,
      isActive: blog.isActive,
      isStaff: blog.isStaff,
      isAdmin: blog.isAdmin,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User),
      data: modifiedData,
    });
  },

  //* CRUD Processes:
  //! POST
  create: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Create User"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  "username": "test",
                  "password": "1234",
                  "email": "test@site.com",
                  "firstName": "test",
                  "lastName": "test",
                  "image": "",
                  "city": "",
                  "bio": ""
                }
          }
    */

    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (!user) {
        // Kullanıcıyı oluştur
        const data = await User.create(req.body);

        // Token oluştur
        const token = jwt.sign({ userId: data._id }, process.env.ACCESS_KEY, {
          expiresIn: "30m",
        });

        // Tokeni kaydet
        await Token.create({ userId: data._id, token });

        // Kullanıcı ve tokeni yanıtla
        res.status(201).send({
          error: false,
          data,
          token,
        });
      } else {
        res.errorStatusCode = 400;
        throw new Error("User with this email already exists.");
      }
    } else {
      res.errorStatusCode = 400;
      throw new Error("Please provide email and password.");
    }

    // const data = await User.create(req.body);

    // res.status(201).send({
    //   error: false,
    //   data,
    // });
  },

  //! /:id -> GET
  read: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Get Single User"
    */

    const data = await User.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data: {
        _id: data._id,
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        city: data.city,
        bio: data.bio,
        isActive: data.isActive,
        isStaff: data.isStaff,
        isAdmin: data.isAdmin,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  },

  //! /:id -> PUT / PATCH
  update: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Update User"
        #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                  "username": "test",
                  "password": "1234",
                  "email": "test@site.com",
                  "firstName": "test",
                  "lastName": "test",
                  "image": "",
                  "city": "",
                  "bio": ""
                }
            }
    */

    const data = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    const updatedUser = await User.findOne({ _id: req.params.id });

    const modifiedUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      password: updatedUser.password,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      image: updatedUser.image,
      city: updatedUser.city,
      bio: updatedUser.bio,
      isActive: updatedUser.isActive,
      isStaff: updatedUser.isStaff,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    res.status(202).send({
      error: false,
      data,
      new: modifiedUser,
      // new: await User.findOne({ _id: req.params.id }),
    });
  },

  //! /:id -> DELETE
  delete: async (req, res) => {
    /*
        #swagger.tags = ["Users"]
        #swagger.summary = "Delete User"
    */

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
