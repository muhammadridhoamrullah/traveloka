const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET;
const EMAIL_SECRET = process.env.EMAIL_SECRET;

// untuk verify email
function signEmailToken(payload) {
  return jwt.sign(payload, EMAIL_SECRET, { expiresIn: "1h" });
}

function verifyEmailToken(token) {
  return jwt.verify(token, EMAIL_SECRET);
}

// Untuk Login
function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  signEmailToken,
  verifyEmailToken,
  signToken,
  verifyToken,
};
