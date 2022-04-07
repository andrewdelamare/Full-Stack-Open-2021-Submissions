const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlog = {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0,
};

const secondBlog = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 13,
  __v: 0,
};

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
  title: 'React CHAOS',
  likes: 20,
};

const initialUsers = [
  {
    username: 'testUser',
    name: 'I do not exist',
    password: 'fake',
  },
  {
    username: 'testUser2',
    name: 'I also do not exist',
    password: 'fake2',
  },
];

const loginInfo = {
  username: 'testUser',
  password: 'fake',
};

let token;
let usrId;

beforeEach(async () => {
  await User.deleteMany({});
  await api
    .post('/api/users')
    .send(initialUsers[0]);
  const res = await api
    .post('/api/login')
    .send(loginInfo);
  token = res.body.token;
  usrId = res.body.id;
  await Blog.deleteMany({});
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(initialBlog);
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(secondBlog);
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
      .set('Authorization', `bearer ${token}`)
      .send(newBlog);

    const response = await api.get('/api/blogs');
    expect(response.body.length).toEqual(3);
  });
  test('default to zero likes if none provided', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(noLikes);
    const response = await api.get('/api/blogs');
    expect(response.body[2]).toHaveProperty('likes', 0);
  });
  test('require title & url', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(noTitleUrl)
      .expect(400);
  });
  test('are deleted', async () => {
    const users = await api
      .get('/api/users');
    await api
      .delete(`/api/blogs/${users.body[0].blogs[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);
    const updated = await api.get('/api/blogs');
    expect(updated.body.length).toEqual(1);
  });
  test('are updated', async () => {
    const users = await api
      .get('/api/users');
    await api
      .put(`/api/blogs/${users.body[0].blogs[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .send(updatedInfo)
      .expect(200);
    const updated = await api.get('/api/blogs');
    expect(updated.body[0]).toHaveProperty('likes', 20);
    expect(updated.body[0]).toHaveProperty('title', 'React CHAOS');
  });
  test('401 if no token provided', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
