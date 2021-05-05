const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// holds the different carts for different users
const OrderItem = sequelize.define('orderItem', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey: true
  },
  quantity:Sequelize.INTEGER
});

module.exports = OrderItem;