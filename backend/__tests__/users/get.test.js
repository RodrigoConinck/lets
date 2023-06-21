const controller = require('../../controllers/users/get')
const Usuario = require('../../models/usuario')

jest.mock('../../models/usuario', () => ({
  findOne: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.findOne.mockClear()
  })

  test('should get a user and return it', async () => {
    const request = {
      query: {
        id: 1,
      },
    }

    const expectedUser = { id: 1, nome: 'John Doe' }
    Usuario.findOne.mockResolvedValue(expectedUser)

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.findOne).toHaveBeenCalledWith({
      where: {
        id: request.query.id,
      },
    })
    expect(res.send).toHaveBeenCalledWith(expectedUser)
  })

  test('should handle error and send error message', async () => {
    const request = {
      query: {},
    }

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.findOne).not.toHaveBeenCalled()
  })
})
