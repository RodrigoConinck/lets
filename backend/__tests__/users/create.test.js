const controller = require('../../controllers/users/create')
const Usuario = require('../../models/usuario')

jest.mock('../../models/usuario', () => ({
  create: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.create.mockClear()
  })

  test('should create a new user and return it', async () => {
    const request = {
      body: {
        nome: 'John Doe',
        sexo: 'M',
        altura: 180,
        peso: 75,
        estado: 'SP',
        cidade: 'São Paulo',
        bairro: 'Centro',
        atividades_preferenciais: ['Corrida', 'Natação'],
        frequencia: 'Diariamente',
        ativo_fisicamente: true,
        email: 'john.doe@example.com',
        senha: 'password123',
        data_nascimento: '1990-01-01',
        foto_perfil: 'profile.jpg',
        whatsapp: '+1234567890',
      },
    }

    const expectedUser = { id: 1, ...request.body }
    Usuario.create.mockResolvedValue(expectedUser)

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(res.send).toHaveBeenCalledWith(expectedUser)
  })

  test('should handle error and send error message', async () => {
    const request = {
      body: {},
    }

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.create).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(404)
  })
})
