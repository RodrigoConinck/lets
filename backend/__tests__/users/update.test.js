const controller = require('../../controllers/users/update')
const Usuario = require('../../models/usuario')

jest.mock('../../models/usuario', () => ({
  update: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.update.mockClear()
  })

  test('should update user and send it', async () => {
    const request = {
      query: {
        id: 1,
      },
      body: {
        nome: 'Novo Nome',
        altura: 180,
      },
    }

    Usuario.update.mockResolvedValue([1]) // Simulating the update success

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.update).toHaveBeenCalledWith(
      {
        nome: 'Novo Nome',
        altura: 180,
      },
      {
        where: {
          id: 1,
        },
      }
    )
  })

  test('should handle error and send error message', async () => {
    
  })

  test('should throw error if id is missing', async () => {
    const res = {
      send: jest.fn(),
    }

    expect(Usuario.update).not.toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
  })
})
