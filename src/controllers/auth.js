"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//? Requaring
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

/* -------------------------------------------------------------------------- */
module.exports = {
  //! POST
  login: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "Login"
        #swagger.description = 'Login with email and password for get simpleToken and JWT'
        _swagger.deprecated = true
        _swagger.ignore = true
        #swagger.parameters["body"] = {
            in: "body",
            required: true,
            schema: {
                "email": "test.site.com",
                "password": "1q2w23e4R!",
            }
        }
    */
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          //* -------------------------------------------------------------------------- */
          //* TOKEN */
          let tokenData = await Token.findOne({ userId: user._id });

          if (!tokenData) {
            const tokenKey = passwordEncrypt(user._id + Date.now());

            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }

          //* TOKEN */
          /* -------------------------------------------------------------------------- */
          //* JWT */
          const accessData = user.toJSON();
          const accessTime = "30m";
          const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, {
            expiresIn: accessTime,
          });

          const refreshData = { id: user._id, password: user.password };
          const refreshTime = "3d";
          const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
            expiresIn: refreshTime,
          });

          //* JWT */
          //! Response for TOKEN and JWT
          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: {
              access: accessToken,
              refresh: refreshToken,
            },
            user,
          });
          //* -------------------------------------------------------------------------- */
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Please enter email and password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password.");
    }
  },

  //! POST
  refresh: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'JWT: Refresh'
        #swagger.description = 'Refresh accessToken with refreshToken'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                bearer: {
                    refresh: '...refreshToken...'
                }
            }
        }
    */

    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      const jwtData = await jwt.verify(refreshToken, process.env.REFRESH_KEY);

      if (jwtData) {
        const { id, password } = jwtData;

        if (id && password) {
          const user = await User.findOne({ _id: id });

          if (user && user.password == password) {
            if (user.isActive) {
              // JWT AccessToken:
              const accessToken = jwt.sign(
                user.toJSON(),
                process.env.ACCESS_KEY,
                { expiresIn: "30m" }
              );

              res.status(200).send({
                error: false,
                bearer: {
                  access: accessToken,
                },
              });
            } else {
              res.errorStatusCode = 401;
              throw new Error("This account is not active.");
            }
          } else {
            res.errorStatusCode = 401;
            throw new Error("Wrong id or password.");
          }
        } else {
          res.errorStatusCode = 401;
          throw new Error("There is not id and password in refreshToken.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT accessToken expires.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter token.refresh");
    }
  },

  //! GET
  logout: async (req, res) => {
    /*
        #swagger.tags = ["Authentication"]
        #swagger.summary = "SimpleToken: Logout"
        #swagger.description = 'Delete token key.'
    */

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    const tokenData = await Token.deleteOne({ token: tokenKey[1] });

    res.send({
      error: false,
      message: "Logged Out",
      data: tokenData,
    });
  },
};
