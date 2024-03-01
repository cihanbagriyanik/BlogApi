"use strict";
/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */
//*todo /* dateToLocaleString(date:Date): */

module.exports = function (dateData) {
  return dateData.toLocaleString("de-De", {
    dateStyle: "full",
    timeStyle: "medium",
  });
};
