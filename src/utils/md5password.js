
const crypto = require("crypto");

function md5password (password) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result;
}


module.exports = md5password