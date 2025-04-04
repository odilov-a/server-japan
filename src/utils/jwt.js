require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

exports.sign = (payload, options = {}) => {
  return jwt.sign(payload, SECRET, { expiresIn: "1d", ...options });
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new Error("Token verification failed");
  }
};
