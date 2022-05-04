const jwt = require("jsonwebtoken");

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return err;
    } else {
      return decoded;
    }
  });
}

module.exports = {
  createToken,
  verifyToken,
};
