const controller = require('../../controllers/users/delete')
const Usuario = require('../../models/usuario')

jest.mock('../../models/usuario', () => ({
  destroy: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.destroy.mockClear()
  })

  test('should destroy a user and return the number of affected rows', async () => {
    const request = {
      query: {
        id: 1,
      },
    }

    const expectedRowsAffected = 1
    Usuario.destroy.mockResolvedValue(expectedRowsAffected)

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.destroy).toHaveBeenCalledWith({
      where: {
        id: request.query.id,
      },
    })
    expect(res.send).toHaveBeenCalledWith({ rows: expectedRowsAffected })
  })

  test('should handle error and send error message', async () => {
    const request = {
      query: {},
    }

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.destroy).not.toHaveBeenCalled()
  })
})
