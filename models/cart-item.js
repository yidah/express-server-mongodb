const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// combination of a producta and the id of the cart in which this product is and the quantity
// the id of the cart is added by using relations in app.js
const CartItem = sequelize.define('cartItem', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey: true
  },
  quantity:Sequelize.INTEGER
});

module.exports = CartItem;