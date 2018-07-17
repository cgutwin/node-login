const mysql = require("./mysql");
const passwords = require("./passwords");
/**
 * Verifies the user credentials by matching the password to the hash.
 */
exports.verify = (username, password) => {
  return new Promise((resolve, reject) => {
    mysql.selectUser(username)
      .then((resp) => {
        passwords.verifyHash(resp.data, password)
          .then((response) => {
            resolve({user: resp.data, resp: response})
          })
          .catch((response) => {
            reject(response)
          })
      })
      .catch((data) => {
        console.log(data);
        reject(data)
      })
  });
};
