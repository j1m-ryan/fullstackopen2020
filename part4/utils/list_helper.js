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

const mostBlogs = (blogPosts) => {
  if (blogPosts == null || blogPosts.length == 0) return {};
  const myMap = new Map();

  blogPosts.forEach((e) => {
    if (myMap.has(e.author)) {
      myMap.set(e.author, 1 + myMap.get(e.author));
    } else {
      myMap.set(e.author, 1);
    }
  });

  let maxPosts = 0;
  let authorWithMostPosts;
  for (const author of myMap) {
    if (myMap.get(author[0]) > maxPosts) {
      maxPosts = author[1];
      authorWithMostPosts = author[0];
    }
  }
  return { author: authorWithMostPosts, blogs: myMap.get(authorWithMostPosts) };
};

const mostLikes = (blogPosts) => {
  if (blogPosts == null || blogPosts.length == 0) return {};
  const myMap = new Map();

  blogPosts.forEach((e) => {
    if (myMap.has(e.author)) {
      myMap.set(e.author, e.likes + myMap.get(e.author));
    } else {
      myMap.set(e.author, 0 + e.likes);
    }
  });

  let mostLikesFromAnAuthor = 0;
  let authorWithMostLikes;
  for (const author of myMap) {
    if (myMap.get(author[0]) > mostLikesFromAnAuthor) {
      mostLikesFromAnAuthor = author[1];
      authorWithMostLikes = author[0];
    }
  }
  return { author: authorWithMostLikes, likes: myMap.get(authorWithMostLikes) };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
