const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USERNAME, process.env.PG_PASSWORD, {
  host: process.env.PG_URL, 
  dialect: 'postgres', 
  port:5433
});

module.exports = sequelize;
