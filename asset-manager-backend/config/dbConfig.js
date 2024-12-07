const { Sequelize } = require("sequelize");
require("dotenv").config();

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

module.exports = sequelize;
