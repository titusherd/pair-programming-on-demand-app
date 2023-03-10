'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Customer"
      })
      //includeny jangan bentuk array di models
      Order.belongsTo(models.Driver, {
        foreignKey: "DriverId"
      })
    }

    getFormatDate() {
      // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return this.createdAt.toLocaleDateString(["en", "id"], options);
    }
  }
  Order.init({
    orderNumber: DataTypes.INTEGER,
    location: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    DriverId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};