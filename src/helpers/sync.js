"use strict";

/* --------------------------------------------------------------------------
    * NODEJS EXPRESS | Blog API
----------------------------------------------------------------------------- */

// sync():

/* -------------------------------------------------------------------------- */
module.exports = async function () {
  // return null;

  /* -------------------------------------------------------------------------- */
  /* User */
  const User = require("../models/user");
  await User.deleteMany(); // !!! Clear collection.
  await User.create({
    _id: "65343222b67e9681f937f001",
    username: "admin",
    password: "1q2w3e4R!",
    email: "admin@site.com",
    firstName: "admin",
    lastName: "admin",
    isActive: true,
    isStaff: true,
    isAdmin: true,
  });
  await User.create({
    _id: "65343222b67e9681f937f002",
    username: "staff",
    password: "1q2w3e4R!",
    email: "staff@site.com",
    firstName: "staff",
    lastName: "staff",
    isActive: true,
    isStaff: true,
    isAdmin: false,
  });
  await User.create({
    _id: "65343222b67e9681f937f003",
    username: "test",
    password: "1q2w3e4R!",
    email: "test@site.com",
    firstName: "test",
    lastName: "test",
    isActive: true,
    isStaff: false,
    isAdmin: false,
  });

  /* -------------------------------------------------------------------------- */
  /* Category */
  const Category = require("../models/category");
  await Category.deleteMany(); // Kategorileri temizle

  const categoryNames = [
    "World",
    "Technology",
    "Design",
    "Culture",
    "Business",
    "Politics",
    "Science",
    "Health",
    "Style",
    "Travel",
  ];

  // Şu anki zamanı al
  const now = new Date();

  // Kategori oluşturma işlemi
  for (let categoryName of categoryNames) {
    await Category.create({
      name: categoryName,
      createdAt: now, // Şu anki zamanı kullan
    });
  }

  // const Category = require("../models/category");
  // await Category.deleteMany(); // !!! Clear collection.
  // const categoryNames = [
  //   "World",
  //   "Technology",
  //   "Design",
  //   "Culture",
  //   "Business",
  //   "Politics",
  //   "Science",
  //   "Health",
  //   "Style",
  //   "Travel",
  // ];
  // const now = new Date();
  // for (let categoryName of categoryNames) {
  //   const category = await Category.create({
  //     name: categoryName,
  //   });

  /* -------------------------------------------------------------------------- */
  /* Blog */
  const Blog = require("../models/blog");
  const Comment = require("../models/comment");
  const mongoose = require("mongoose");

  await Blog.deleteMany(); // !!! Clear collection.

  const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.

Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
`;

  for (let i = 1; i <= 10; i++) {
    const userId = new mongoose.Types.ObjectId();

    const blog = await Blog.create({
      userId: userId,
      categoryId: "65343222b67e9681f937f101",
      title: `Sample Post ${i}`,
      content: `
      <p>${loremIpsum}</p>
      <p>${loremIpsum}</p>
      <p>${loremIpsum}</p>
    `,
      image:
        "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png",
      likes: [],
      isPublish: true,
      createdAt: new Date(now.getTime() + Math.random() * 10e8),
      updatedAt: new Date(),
    });

    const comment = await Comment.create({
      userId: userId,
      blogId: blog.id,
      comment: "This is a sample comment.",
    });

    blog.comments.push(comment._id);
    await blog.save();
  }

  /* Finished */
  console.log("* Synchronized.");
  process.exit();
};
