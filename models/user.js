'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Driver)
      User.hasMany(models.Order)
    }
    getFormatDate() {
      // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return this.createdAt.toLocaleDateString(["en-US"], options);
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        notEmpty: {
          msg: 'Email is required!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required!'
        },
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email is invalid!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required!'
        },
        notEmpty: {
          msg: 'Password is required!'
        },
        min5chars(value) {
          if (value.length < 5) {
            throw new Error("Password must be at least 5 characters!")
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please select your role!'
        },
        notEmpty: {
          msg: 'Please select your role!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User'
  });
  return User;
};