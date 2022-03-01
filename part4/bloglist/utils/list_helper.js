// const _ = require('lodash');

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

const countBlogs = (arr) => {
  const result = {};
  arr.forEach((item) => {
    if (Object.keys(result).includes(item.author)) {
      const key = item.author;
      result[key] += 1;
    } else {
      const { author } = item;
      result[author] = 1;
    }
  });
  console.log(result);
  return result;
};

const mostBlogs = (blogs) => {
  const obj = countBlogs(blogs);
  console.log('list of occurences after find something', obj);
  let mostNum = 0;
  let mostAuthor = '';
  for (const [key, value] of Object.entries(obj)) {
    if (value > mostNum) {
      mostNum = value;
      mostAuthor = key;
    }
  }
  return (
    {
      author: mostAuthor,
      blogs: mostNum,
    });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
