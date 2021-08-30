var mysql = require("mysql");
require("dotenv").config();

class MySql {
  connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOSTNAME,
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

module.exports = new MySql();
