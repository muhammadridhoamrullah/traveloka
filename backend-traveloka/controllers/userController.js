const { Op } = require("sequelize");
const { User, Flight } = require("../models/index");
const {
  signEmailToken,
  verifyEmailToken,
  signToken,
} = require("../helpers/jwt");
const { sendVerificationEmail } = require("../service/emailService");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
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

  static async login(req, res, next) {
    try {
      // ambil dulu email/username dan password
      const { identifier, password } = req.body;

      if (!identifier || !password) {
        throw { name: "LOGIN_FIELDS_REQUIRED" };
      }

      // Cek user berdasarkan identifier
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { username: identifier }],
        },
        attributes: { include: ["password"] },
      });

      if (!findUser) {
        throw { name: "LOGIN_EMAIL_PASSWORD_INVALID" };
      }

      // Cek apakah user emailnya sudah verif atau belum
      if (!findUser.isEmailVerified) {
        throw { name: "LOGIN_USER_NOT_VERIFIED" };
      }

      // Cek password apakah valid
      const comparingPass = comparePassword(password, findUser.password);

      if (!comparingPass) {
        throw { name: "LOGIN_EMAIL_PASSWORD_INVALID" };
      }

      // Buat access_token dulu
      const access_token = signToken({ id: findUser.id });

      // Update last login at
      await User.update(
        {
          lastLoginAt: new Date(),
        },
        {
          where: {
            id: findUser.id,
          },
        }
      );

      // return token
      res.status(200).json({
        access_token,
      });
    } catch (error) {
      console.log(error, "<< err");

      next(error);
    }
  }
}

module.exports = {
  UserController,
};
