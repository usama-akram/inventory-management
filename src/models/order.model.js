const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product.model');


const Order = sequelize.define('Order', {
  // Define attributes for your model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,  // Sequelize will automatically add 'createdAt' and 'updatedAt' fields
});

Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;
