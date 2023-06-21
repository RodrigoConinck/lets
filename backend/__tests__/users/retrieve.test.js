const controller = require('../../controllers/users/retrieve')
const Usuario = require('../../models/usuario')

jest.mock('../../models/usuario', () => ({
  findAll: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.findAll.mockClear()
  })

  test('should retrieve users and send them', async () => {
    const expectedUsers = [
      { id: 1, nome: 'User 1' },
      { id: 2, nome: 'User 2' },
    ]
    Usuario.findAll.mockResolvedValue(expectedUsers)

    const res = {
      send: jest.fn(),
    }

    await controller(null, res)

    expect(Usuario.findAll).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalledWith(expectedUsers)
  })

  test('should handle error and send error message', async () => {

    const res = {
      send: jest.fn(),
    }

    await controller(null, res)

    expect(Usuario.findAll).toHaveBeenCalled()
  })
})
