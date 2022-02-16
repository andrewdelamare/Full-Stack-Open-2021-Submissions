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
/*
const findSomething = (arr) => {
  let result = [];
  arr.forEach((item) => {
    if(result.forEach(thing => Object.keys(thing).includes(item.author))){
        result[item.author] += 1
    }else{
        const key = item.author;
        result.push({ item.author: 1 })
    }
  })
  console.log(result);
  return result;
};

const mostBlogs = (blogs) => {
  const array = findSomething(blogs, 'author');
  console.log('list of occurences after find something', array);
  let mostNum = 0;
  let mostAuthor = '';
  array.forEach((auth) => {
    if (auth.occurrence > mostNum) {
      mostNum = auth.occurrence;
      mostAuthor = auth.author;
    }
  });
  return (
    {
      author: mostAuthor,
      blogs: mostNum,
    });
};
*/
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
