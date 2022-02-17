const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const newBlog = {
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0,
};

const noLikes = {
  title: 'A new entry with no likes',
  author: 'no one',
  url: 'fake url',
};

const noTitleUrl = {
  author: 'no one',
  likes: 0,
};

const updatedInfo = {
  id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered NOT Harmful!',
  likes: 20,
};

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe('Blogs', () => {
  test(' are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('_id renamed to id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
  test('are posted', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog);
    const response = await api.get('/api/blogs');
    expect(response.body.length).toEqual(3);
  });
  test('default to zero likes if none provided', async () => {
    await api
      .post('/api/blogs')
      .send(noLikes);
    const response = await api.get('/api/blogs');
    expect(response.body[2]).toHaveProperty('likes', 0);
  });
  test('require title & url', async () => {
    await api
      .post('/api/blogs')
      .send(noTitleUrl)
      .expect(400);
  });
  test('are deleted', async () => {
    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f8')
      .expect(204);
    const updated = await api.get('/api/blogs');
    expect(updated.body.length).toEqual(1);
  });
  test('are updated', async () => {
    await api
      .put('/api/blogs/5a422aa71b54a676234d17f8')
      .send(updatedInfo)
      .expect(200);
    const updated = await api.get('/api/blogs');
    expect(updated.body[1]).toHaveProperty('likes', 20);
    expect(updated.body[1]).toHaveProperty('title', 'Go To Statement Considered NOT Harmful!');
  });
});

afterAll(() => {
  mongoose.connection.close();
});
