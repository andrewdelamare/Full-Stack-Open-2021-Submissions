const { DATABASE_URL } = require('./config');
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDb = async () => {
  try {
   sequelize.authenticate();
   console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database");
    process.exit(1);
  }
  return null;
};

module.exports = {sequelize, connectToDb};