const logger = require("../utils/Logging");
const bcrypt = require("bcrypt");

function checkPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

module.exports = {
  checkPassword,
};
