const crypto = require("crypto");
require("dotenv").config();
const connection = require('../../config/db');
const hashData = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

function encrypt(data) {
  const numberAsString = data.toString();
  const cipher = crypto.createCipher("aes-256-cbc", process.env.SECRET_CODE);
  let encrypted = cipher.update(numberAsString, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(data) {
  const decipher = crypto.createDecipher(
    "aes-256-cbc",
    process.env.SECRET_CODE
  );
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return parseInt(decrypted, 10);
}
const getUserByEmail = (email) => new Promise((resolve, reject) => {
  connection.query(
    `SELECT id FROM _user WHERE email = ?`,
    email,
    (err, results) => {
      if (err) reject(err);
      resolve(results.pop().id);
    }
  );
});

module.exports = {
  hashData,
  encrypt,
  decrypt,
  getUserByEmail
};
