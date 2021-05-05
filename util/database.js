// ORM connection to the db
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root','yidah',{
  dialect:'mysql',
  host:'localhost'
});

module.exports = sequelize;


