// dbConfig.js
const { Sequelize } = require("sequelize");
require("dotenv").config();
const Device = require("../models/Device.model");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

sequelize
  .authenticate()
  .then(() => console.log("Connection to database successfully established"))
  .catch((err) => console.log("Unable to connect to database", err));

sequelize
  .sync()
  .then(() => {
    console.log("Models created successfully");
  })
  .catch((error) => {
    console.error("Unable to create tables: ", error);
  });

module.exports = sequelize; // Correctly export the instance
