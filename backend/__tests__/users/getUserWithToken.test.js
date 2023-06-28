const controller = require('../../controllers/users/getUserWithToken');
const Usuario = require('../../models/usuario');
const jwt = require('jsonwebtoken');

jest.mock('../../models/usuario');

describe('Seu Controlador', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('deve retornar o usuário correto', async () => {
      const req = {
        headers: {
          token: 'token-de-exemplo',
        },
      };

      const user = {
        id: 1,
        nome: 'Exemplo',
        email: 'exemplo@example.com',
      };

      Usuario.findOne.mockResolvedValue(user);

    });

    it('deve lançar um erro se ocorrer um erro durante a consulta', async () => {
      const req = {
        headers: {
          token: 'token-de-exemplo',
        },
      };

      Usuario.findOne.mockRejectedValue(new Error('Erro na consulta'));
    });
  });

  describe('Controlador principal', () => {
    it('deve retornar o usuário corretamente', async () => {
      const req = {};

      const user = {
        id: 1,
        nome: 'Exemplo',
        email: 'exemplo@example.com',
      };

      controller.getUser = jest.fn().mockResolvedValue(user);

      const res = {
        send: jest.fn(),
      };

      await controller(req, res);
    });

    it('deve retornar uma mensagem de erro se ocorrer um erro no controlador', async () => {
      const req = {};

      controller.getUser = jest.fn().mockRejectedValue(new Error('Erro no controlador'));

      const res = {
        send: jest.fn(),
      };

      await controller(req, res);
    });
  });
});
