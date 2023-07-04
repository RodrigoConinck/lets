const controller = require('../../controllers/users/getNearPersons');
const Likes = require('../../models/likes');
const { Op } = require('sequelize');
const moment = require('moment');

jest.mock('../../models/likes');
jest.mock('moment');

describe('Seu Controlador', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('retrieveUser', () => {
    it('deve retornar os usuários corretos', async () => {
      const req = {
        infUser: {
          id: 1,
          cidade: 'Exemplo',
        },
      };

      const expectedLikes = [
        { fk_curtido: 2 },
        { fk_curtido: 3 },
      ];
      Likes.findAll.mockResolvedValue(expectedLikes);

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await controller(req, res);

      expect(Likes.findAll).toHaveBeenCalledWith({
        where: {
          fk_curtidor: req.infUser.id,
        },
      });
    });

    it('deve lançar um erro se ocorrer um erro durante a consulta', async () => {
      const req = {
        infUser: {
          id: 1,
          cidade: 'Exemplo',
        },
      };

      Likes.findAll.mockRejectedValue(new Error('Erro na consulta de likes'));

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await controller(req, res);

      expect(Likes.findAll).toHaveBeenCalledWith({
        where: {
          fk_curtidor: req.infUser.id,
        },
      });
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Controlador principal', () => {
    it('deve retornar uma mensagem de erro se ocorrer um erro no controlador', async () => {
      const req = {};

      controller.retrieveUser = jest.fn().mockRejectedValue(new Error('Erro no controlador'));

      const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await controller(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
