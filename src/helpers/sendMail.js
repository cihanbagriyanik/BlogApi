"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
// $ npm i nodemailer
const nodemailer = require("nodemailer");

/* -------------------------------------------------------------------------- */
//? Sending E-Mail:
module.exports = function (to, subject, message) {
  //? GoogleMail (gmail):
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cihanbagriyanikde@gmail.com",
      pass: "lgriawxlsgxcuabt",
    },
  });
  // console.log(transporter);

  transporter.sendMail(
    {
      to: to,
      subject: subject,
      // Message:
      text: message,
      html: message,
    },
    (error, success) => {
      // error ? console.log("Error:", error) : console.log("Success:", success);
      error ? error : success;
    }
  );
};
