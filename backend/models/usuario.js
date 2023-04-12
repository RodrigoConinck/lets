const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    altura: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    atividades_preferenciais: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
    },
    frequencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ativo_fisicamente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    foto_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Usuario;
