const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "leagueracing"
});

/**
 * Inserts into the MySQL database.
 * @param {string} table - The table to insert into.
 * @param {object} data - Actually object. KVP for the data to insert. Manipulated to extract the column name then the data.
 */
exports.insert = (table, data) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO ${table} SET ?`;
    query = mysql.format(query, data);
    
    // resolve(query);
    connection.query(query, (error, results) => {
      if (error) reject(error);
      if (results) {
        resolve(results);
      }
    });
  });
};
/**
 * Gets all from a given table.
 * @param {string} table - The table to get from.
 */
exports.selectAll = (table) => {
  return new Promise((resolve, reject) => {
    
    let query = `SELECT * FROM ${table}`;
    // resolve(query);
    connection.query(query, (error, results) => {
      if (error) reject(error);
      if (results) {
        resolve(results);
      }
    });
  });
};
/**
 * Gets a user's password from their username
 * @param {string} username
 */
exports.selectUser = (username) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users INNER JOIN passwords ON users.UserID = passwords.UserID WHERE Username = ?`;
    query = mysql.format(query, username);
    
    connection.query(query, (error, results) => {
      if (results[0] === undefined) reject({exists: false, message: "User doesn't exist.", data: results});
      else resolve({exists: true, message: "User exists.", data: results});
    });
  });
};