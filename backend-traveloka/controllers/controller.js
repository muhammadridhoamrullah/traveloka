const { Op } = require("sequelize");
const { User, Flight } = require("../models/index");
const { signEmailToken, verifyEmailToken } = require("../helpers/jwt");
const { sendVerificationEmail } = require("../service/emailService");

class Controller {
  static async register(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        username,
        password,
        email,
        phoneNumber,
        address,
        dateOfBirth,
      } = req.body;

      if (
        !firstName ||
        !lastName ||
        !username ||
        !password ||
        !email ||
        !phoneNumber ||
        !address ||
        !dateOfBirth
      ) {
        throw { name: "REGISTER_FIELDS_REQUIRED" };
      }

      //   Cek terlebih dahulu apakah username sudah terdaftar
      const checkUsername = await User.findOne({ where: { username } });
      if (checkUsername) {
        throw { name: "REGISTER_USERNAME_ALREADY_EXISTS" };
      }

      //   Cek terlebih dahulu apakah email sudah terdaftar
      const checkEmail = await User.findOne({ where: { email } });
      if (checkEmail) {
        throw { name: "REGISTER_EMAIL_ALREADY_EXISTS" };
      }

      //   Cek nomor telepon terlebih dahulu apakah sudah terdaftar
      const checkPhoneNumber = await User.findOne({ where: { phoneNumber } });
      if (checkPhoneNumber) {
        throw { name: "REGISTER_PHONE_NUMBER_ALREADY_EXISTS" };
      }

      const createUser = await User.create({
        ...req.body,
      });

      const token = signEmailToken({
        id: createUser.id,
      });

      const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

      const emailData = {
        firstName: createUser.firstName,
        email: createUser.email,
        link,
      };

      await sendVerificationEmail(emailData);

      res.status(201).json({
        message: `User created successfully, please check your email for verify your account`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      if (!token) {
        throw { name: "MISSING_TOKEN" };
      }

      const decoded = verifyEmailToken(token);

      const user = await User.findByPk(decoded.id);

      if (!user) {
        throw { name: "USER_NOT_FOUND" };
      }

      if (user.isEmailVerified) {
        throw { name: "EMAIL_ALREADY_VERIFIED" };
      }

      await User.update(
        {
          isEmailVerified: true,
        },
        {
          where: {
            id: decoded.id,
          },
        }
      );

      res.status(200).json({
        message: "Email verified successfully, you can login now",
      });
    } catch (error) {
      next(error);
    }
  }
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
