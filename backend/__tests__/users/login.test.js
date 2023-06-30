const controller = require('../../controllers/users/login');
const Usuario = require('../../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../models/usuario');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Seu Controller', () => {
  beforeEach(() => {
    Usuario.findOne.mockClear();
    bcrypt.compare.mockClear();
    jwt.sign.mockClear();
  });

  test('Deve encontrar o usuário, comparar a senha, assinar o token e enviá-lo', async () => {
    const request = {
      body: {
        email: 'test@example.com',
        senha: 'password123',
      },
    };

    const expectedUser = { id: 1, email: 'test@example.com', senha: 'hashedPassword' };
    Usuario.findOne.mockResolvedValue(expectedUser);

    const isMatch = true;
    bcrypt.compare.mockResolvedValue(isMatch);

    const expectedToken = 'jsonwebtoken';
    jwt.sign.mockReturnValue(expectedToken);

    const res = {
      send: jest.fn(),
    };

    await controller(request, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({
      raw: true,
      where: {
        email: request.body.email,
      },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(request.body.senha, expectedUser.senha);
    expect(jwt.sign).toHaveBeenCalledWith(expectedUser, process.env.SEGREDOJWT);
    expect(res.send).toHaveBeenCalledWith(expectedToken);
  });

  test('Deve lidar com erro e enviar a mensagem de erro', async () => {
    const request = {
      body: {
        email: 'test@example.com',
        senha: 'password123',
      },
    };

    Usuario.findOne.mockResolvedValue(null);

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await controller(request, res);

    expect(Usuario.findOne).toHaveBeenCalledWith({
      raw: true,
      where: {
        email: request.body.email,
      },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });
});
