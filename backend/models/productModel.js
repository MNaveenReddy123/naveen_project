const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // database connection

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING, // You can store the path to the image file here
    allowNull: false
  },
  isSecondHand: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Product;
