const sequelize = require('./config');
const Usuario = require('./models/usuario');

// Defina as associações entre os modelos, se necessário
// Exemplo de associação: Usuario.hasMany(OutroModelo);

// Sincronize os modelos com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados');
  })
  .catch((error) => {
    console.error('Falha ao sincronizar modelos com o banco de dados:', error);
  });
