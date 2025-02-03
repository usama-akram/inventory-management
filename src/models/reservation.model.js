const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product.model');


const Reservation = sequelize.define('Reservation', {
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
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,  // Sequelize will automatically add 'createdAt' and 'updatedAt' fields
});

Reservation.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Reservation;
