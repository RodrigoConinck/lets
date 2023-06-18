const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Usuario = sequelize.define('Usuario', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: DataTypes.DATE
    },
    sexo: {
        type: DataTypes.STRING
    },
    altura: {
        type: DataTypes.FLOAT
    },
    peso: {
        type: DataTypes.FLOAT
    },
    estado: {
        type: DataTypes.STRING
    },
    cidade: {
        type: DataTypes.STRING
    },
    bairro: {
        type: DataTypes.STRING
    },
    atividades_preferenciais: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    frequencia: {
        type: DataTypes.STRING
    },
    ativo_fisicamente: {
        type: DataTypes.BOOLEAN
    },
    foto_perfil: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    whatsapp: {
        allowNull: true,
        type: DataTypes.BIGINT
    }
},
    {
        tableName: "usuarios"
    });

module.exports = Usuario;
