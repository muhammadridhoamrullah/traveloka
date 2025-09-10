const { Op } = require("sequelize");
const { User, Flight } = require("../models/index");
const {
  signEmailToken,
  verifyEmailToken,
  signToken,
} = require("../helpers/jwt");
const { sendVerificationEmail } = require("../service/emailService");
const { comparePassword } = require("../helpers/bcrypt");

class FlightController {
  static async test(req, res, next) {
    try {
      const user = req.user.firstName;
      console.log(user, "<< user dari middleware");
      res.status(200).json({ message: "Test success" });
    } catch (error) {
      console.log(error, "<< err");

      next(error);
    }
  }
}

module.exports = {
  FlightController,
};
