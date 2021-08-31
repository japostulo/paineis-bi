require("dotenv").config();
var mysql = require("mysql");
class MySql {
  connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    this.connection.connect();
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = MySql;
