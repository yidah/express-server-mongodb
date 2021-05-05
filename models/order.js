const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// holds the different carts for different users
const Order = sequelize.define('order', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey: true
  }
});

module.exports = Order;