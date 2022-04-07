const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

const initialUsers = [
  {
    username: "testUser",
    name: "I do not exist",
    password: "fake",
    _id: "621ded029db19dc1e67b8830",
  },
  {
    username: "testUser2",
    name: "I also do not exist",
    password: "fake2",
    _id: "621ded029db19dc1e67b8832",
  },
];

const usrShort = {
  username: "te",
  name: "I also do not exist",
  password: "fake",
};

const usrMissing = {
  username: "",
  name: "I also do not exist",
  password: "fake",
};

const usrExists = {
  username: "testUser",
  name: "I do not exist",
  password: "fake2",
};

const passShort = {
  username: "passShort",
  name: "I do not exist",
  password: "fa",
};

const passMissing = {
  username: "passMissing",
  name: "I also do not exist",
  password: "",
};

beforeEach(async () => {
  await User.deleteMany({});
  let userObject = new User(initialUsers[0]);
  await userObject.save();
  userObject = new User(initialUsers[1]);
  await userObject.save();
});

describe("User", () => {
  test("is not saved if username too short", async () => {
    await api.post("/api/users").send(usrShort).expect(400);
  });
  test("is not saved if username missing", async () => {
    await api.post("/api/users").send(usrMissing).expect(400);
  });
  test("is not saved if username exists", async () => {
    await api.post("/api/users").send(usrExists).expect(400);
  });
  test("is not saved if password is too short", async () => {
    await api.post("/api/users").send(passShort).expect(400);
  });
  test("is not saved if password is missing", async () => {
    await api.post("/api/users").send(passMissing).expect(400);
  });
});
