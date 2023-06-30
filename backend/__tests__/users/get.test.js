const Usuario = require('../../models/usuario');

const controller = require('../../controllers/users/get');

jest.mock('../../models/usuario');

describe('Seu Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Deve retornar o usuário correspondente ao ID fornecido', async () => {
    const req = {
      query: {
        id: 1,
      },
    };

    const expectedUser = { id: 1, nome: 'John Doe', email: 'johndoe@example.com' };
    Usuario.findOne.mockResolvedValueOnce(expectedUser);

    const res = {
      send: jest.fn(),
    };

    await controller(req, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({
      where: {
        id: req.query.id,
      },
    });
    expect(res.send).toHaveBeenCalledWith(expectedUser);
  });

  test('Deve retornar um erro quando o ID não é fornecido', async () => {
    const req = {
      query: {},
    };

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await controller(req, res);

    expect(Usuario.findOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.status().send).toHaveBeenCalledWith({ message: 'id obrigatorio' });
  });

  test('Deve lidar com erro e enviar a mensagem de erro', async () => {
    const req = {
      query: {
        id: 1,
      },
    };

    Usuario.findOne.mockRejectedValueOnce(new Error('Erro ao buscar usuário'));

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await controller(req, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({
      where: {
        id: req.query.id,
      },
    });
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
