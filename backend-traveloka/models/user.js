"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Flight, {
        foreignKey: "UserId",
        as: "managedFlights",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name is required",
          },
          notEmpty: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name is required",
          },
          notEmpty: {
            msg: "Last name is required",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username must be unique",
        },
        validate: {
          notNull: {
            msg: "Username is required",
          },
          notEmpty: {
            msg: "Username is required",
          },
          isAlphanumeric: {
            msg: "Username can only contain letters and numbers",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email must be unique",
        },
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 25],
            msg: "Password must be between 6 and 25 characters",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "User",
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role is required",
          },
          notEmpty: {
            msg: "Role is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number is required",
          },
          notEmpty: {
            msg: "Phone number is required",
          },
          isNumeric: {
            msg: "Phone number can only contain numbers",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Date of birth is required",
          },
          notEmpty: {
            msg: "Date of birth is required",
          },
          isDate: {
            msg: "Must be a valid date",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address is required",
          },
          notEmpty: {
            msg: "Address is required",
          },
        },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });

  // Hook untuk menghapus data flight terkait saat user dihapus
  User.beforeDestroy(async (user, options) => {
    const { Flight } = sequelize.models;

    // Hapus semua flight yang terkait dengan user ini
    await Flight.update(
      {
        deletedAt: new Date(),
      },
      {
        where: {
          UserId: user.id,
        },
        transaction: options.transaction,
        individualHooks: true,
        hooks: true,
      }
    );
  });
  return User;
};
