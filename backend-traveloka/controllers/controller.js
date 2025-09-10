const { Op } = require("sequelize");
const { User, Flight } = require("../models/index");
const {
  signEmailToken,
  verifyEmailToken,
  signToken,
} = require("../helpers/jwt");
const { sendVerificationEmail } = require("../service/emailService");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
  

  

  
}

module.exports = {
  Controller,
};

// DAFTAR ERROR

// REGISTER_FIELDS_REQUIRED
// REGISTER_USERNAME_ALREADY_EXISTS
// REGISTER_EMAIL_ALREADY_EXISTS
// REGISTER_PHONE_NUMBER_ALREADY_EXISTS

// MISSING_TOKEN
// USER_NOT_FOUND
// EMAIL_ALREADY_VERIFIED

// LOGIN_FIELDS_REQUIRED
// LOGIN_EMAIL_PASSWORD_INVALID
// LOGIN_USER_NOT_VERIFIED

// UNAUTHORIZED
