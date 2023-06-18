const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Usuario = require('./usuario');

const Likes = sequelize.define('Likes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  fk_curtidor: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  fk_curtido: {
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
  tableName: 'likes'
});

Likes.belongsTo(Usuario, { as: 'curtidor', foreignKey: 'fk_curtidor' });
Likes.belongsTo(Usuario, { as: 'curtido', foreignKey: 'fk_curtido' });

module.exports = Likes;
