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
      Driver.hasOne(models.Category)
      Driver.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Driver"
      })
    }
  }
  Driver.init({
    fullName: DataTypes.STRING,
    money: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};