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

module.exports = { dummy, totalLikes };
