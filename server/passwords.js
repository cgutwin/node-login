const bcrypt = require('bcrypt'),
  saltRounds = 10;

/**
 * Creates a hash from the given password
 * @param {string} password - The plain password.
 */
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
      if (err) reject(err);
    });
  });
};
/**
 * Verifies if the given plain password matches the stored hash.
 * @param {string} hash - The hash.
 * @param {string} plain - The plain password.
 */
exports.verifyHash = (hash, plain) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash[0].Password, function (err, res) {
      if (err) reject(err);
      resolve({auth: res});
    });
  });
};