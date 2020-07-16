const e = require("express");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  let total = 0;
  blogPosts.forEach((post) => {
    total += post.likes;
  });
  return total;
};

const favouriteBlog = (blogPosts) => {
  if (blogPosts === null || blogPosts.length === 0) return {};
  let maxLikes = 0;
  let favouritePost;
  blogPosts.forEach((e) => {
    if (e.likes > maxLikes) {
      favouritePost = e;
      maxLikes = e.likes;
    }
  });
  return {
    title: favouritePost.title,
    author: favouritePost.author,
    likes: favouritePost.likes,
  };
};

module.exports = { dummy, totalLikes, favouriteBlog };
