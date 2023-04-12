const Sequelize = require('sequelize');

// Configuração de conexão com o banco de dados
const sequelize = new Sequelize('letsdb', 'root',process.env.SENHADB, {
  host: 'localhost', // host do banco de dados
  dialect: 'postgres', // nome do banco de dados (ex: 'postgres', 'mysql', 'sqlite', 'mssql')
});

module.exports = sequelize;
