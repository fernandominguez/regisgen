let config = require("../config");
let mysql = require("mysql");

class Database {
  constructor(config) {
    this.connection = mysql.createPool(config);
  }
  query(sql, params) {
    return new Promise((resolve, reject) => {
      let query = mysql.format(sql, params);
      this.connection.query(query, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = new Database({
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE
});
