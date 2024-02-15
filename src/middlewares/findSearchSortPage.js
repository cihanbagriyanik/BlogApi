"use strict";

/* -------------------------------------------------------
    * BLOG API PROJECT (FILTERING & SEARCHING & SORTING & PAGINATION)
------------------------------------------------------- */

module.exports = (req, res, next) => {
  //* Filtering:
  const filter = req.query?.filter || {};
  //   console.log(filter);

  //* Searching:
  const search = req.query?.search || {};

  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" };
  }
  // console.log(search);

  //* Sorting:
  const sort = req.query?.sort || {};
  // console.log(sort);

  //* PAGINATION:
  let limit = Number(req.query?.limit);

  limit = limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20);

  let page = Number(req.query?.page);
  page = page > 0 ? page - 1 : 0;

  let skip = Number(req.query?.skip);
  skip = skip > 0 ? skip : page * limit;

  //? Run for output:

  res.getModelList = async (Model, populate = null) => {
    return await Model.find({ ...filter, ...search })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  //? Details:
  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
