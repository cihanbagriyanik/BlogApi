"use strict";
/* -------------------------------------------------------
    * BLOG API PROJECT (MONGODB CONNECTION)
------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
//* Data Base Connection

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB NOT Connected", err));
