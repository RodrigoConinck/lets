const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Usuario = require('./usuario');

const Matchs = sequelize.define('Matchs', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fk_primeiro_usuario: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  fk_segundo_usuario: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE
  },
  updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
  }
}, {
  tableName: 'matchs'
});

Matchs.belongsTo(Usuario, { as: 'primeiro_usuario', foreignKey: 'fk_primeiro_usuario' });
Matchs.belongsTo(Usuario, { as: 'segundo_usuario', foreignKey: 'fk_segundo_usuario' });

module.exports = Matchs;
