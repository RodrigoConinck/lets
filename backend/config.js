const Sequelize = require('sequelize');

// Configuração de conexão com o banco de dados
const sequelize = new Sequelize('letsdb', 'postgres', '9151', {
  host: 'localhost', // host do banco de dados
  dialect: 'postgres', // nome do banco de dados (ex: 'postgres', 'mysql', 'sqlite', 'mssql')
  port:5433
});

module.exports = sequelize;
