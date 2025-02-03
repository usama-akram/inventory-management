const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Order = require('./order.model');

const Product = sequelize.define('Product', {
  // Define attributes for your model
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  stocks: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,  // Sequelize will automatically add 'createdAt' and 'updatedAt' fields
});

module.exports = Product;
