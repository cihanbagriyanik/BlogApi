"use strict";

/* -------------------------------------------------------------------------- //

    BLOGAPP API Project INDEX.js

/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
//? Express Import
const express = require("express");
const app = express();

/* -------------------------------------------------------------------------- */
//? DOTENV Import
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* -------------------------------------------------------------------------- */
//? DB CONNECTION
require("./src/configs/dbConnection");

/* -------------------------------------------------------------------------- */
//? SessionCookies:
const session = require("cookie-session");

app.use(
  session({
    secret: process.env.SECRET_KEY || "write_random_chars_in_here",
  })
);

/* -------------------------------------------------------------------------- */
//? Filtering, Searching, Sorting, Pagination
app.use(require("./src/middlewares/findSearchSortPage"));

/* -------------------------------------------------------------------------- */
//? JSON
app.use(express.json());

/* -------------------------------------------------------------------------- */
//? Express-async-errors Import
require("express-async-errors");

/* -------------------------------------------------------------------------- */
//? HOME Page
app.all("/", (req, res) => {
  // res.send("Welcome First Express Project"); // For with out Cookies
  /* -------------------------------------------------------------------------- */
  // With Cookies
  res.send({
    message: "Welcome First ExpressJs Project with Mongo", // INSIDE OBJE
    session: req.session,
    login: req.session.email ? true : false,
  });
  /* -------------------------------------------------------------------------- */
});

/* -------------------------------------------------------------------------- */
//? ROUTES
app.use("/user", require("./src/routers/userRouter"));
app.use("/blog", require("./src/routers/blogRouter"));

/* -------------------------------------------------------------------------- */
//? ERROR HANDLER
app.use(require("./src/middlewares/errorHandler"));

/* -------------------------------------------------------------------------- */
//? SYNCRONIZATION:
// require("./src/sync")();

/* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log("Running on http://127.0.0.1:" + PORT));
