"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "managerFlight",
      });
    }
  }
  Flight.init(
    {
      flightNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Flight number must be unique",
        },
        validate: {
          notNull: {
            msg: "Flight number is required",
          },
          notEmpty: {
            msg: "Flight number is required",
          },
          isAlphanumeric: {
            msg: "Flight number can only contain letters and numbers",
          },
        },
      },
      airline: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Airline is required",
          },
          notEmpty: {
            msg: "Airline is required",
          },
        },
      },
      aircraft: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Aircraft is required",
          },
          notEmpty: {
            msg: "Aircraft is required",
          },
        },
      },
      departure: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Departure information is required",
          },
          notEmpty: {
            msg: "Departure information is required",
          },
        },
      },
      arrival: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Arrival information is required",
          },
          notEmpty: {
            msg: "Arrival information is required",
          },
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Duration is required",
          },
          notEmpty: {
            msg: "Duration is required",
          },
          isInt: {
            msg: "Duration must be an integer",
          },
          min: {
            args: 0,
            msg: "Duration must be a positive integer",
          },
        },
      },
      cabinClasses: {
        type: DataTypes.JSONB,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Cabin classes are required",
          },
          notEmpty: {
            msg: "Cabin classes are required",
          },
        },
      },
      stops: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
        validate: {
          notNull: {
            msg: "Stops information is required",
          },
          notEmpty: {
            msg: "Stops information is required",
          },
        },
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id is required",
          },
          notEmpty: {
            msg: "User Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Flight",
      paranoid: true,
      timestamps: true,
    }
  );
  return Flight;
};
