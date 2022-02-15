const dummy = () => 1;

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => {
    total += blog.likes;
  });
  return total;
};

const favoriteBlog = (blogs) => {
  let fav = {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  };
  blogs.forEach((blog) => {
    if (blog.likes > fav.likes) {
      fav = blog;
    }
  });
  return fav;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
