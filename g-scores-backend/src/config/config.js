require("dotenv").config();

const username = process.env.MYSQLUSER || process.env.DB_USER;
const password = process.env.MYSQLPASSWORD || process.env.DB_PASS;
const database = process.env.MYSQLDATABASE || process.env.DB_NAME;
const host = process.env.MYSQLHOST || process.env.DB_HOST;
const port = process.env.MYSQLPORT || process.env.DB_PORT || 3306;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    dialectOptions: {
      connectTimeout: 300000,
    },
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
      acquire: 300000,
    },
  },

  production: {
    username,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    dialectOptions: {
      ssl: false, // Railway không yêu cầu SSL
    },
  },
};
