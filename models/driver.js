'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Category)
      Driver.belongsTo(models.User, {
      })
    }
  }
  Driver.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name is required!'
        },
        notEmpty: {
          msg: 'name is required!'
        }
      }
    },
    address: DataTypes.STRING,
    money: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Driver',
    hooks: {
      beforeCreate: (instance, option) => {
        instance.money = 0;
        instance.point = 0;
      }
    }
  });
  return Driver;
};