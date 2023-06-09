const controller = require('../../controllers/matchs/retrieveMatchs')
const Matchs = require('../../models/matchs')
const { Op } = require('sequelize');

jest.mock('../../models/matchs', () => ({
  findAll: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Matchs.findAll.mockClear()
  })

  test('should retrieve matches and send them as response', async () => {
    const request = {
      infUser: {
        id: 'userId',
      },
    }

    const expectedMatches = [
      { id: 1, fk_primeiro_usuario: 'userId', fk_segundo_usuario: 'otherUserId' },
      { id: 2, fk_primeiro_usuario: 'otherUserId', fk_segundo_usuario: 'userId' },
    ]
    Matchs.findAll.mockResolvedValue(expectedMatches)

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(Matchs.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [
          { fk_primeiro_usuario: request.infUser.id },
          { fk_segundo_usuario: request.infUser.id },
        ],
      },
    })
  })

  test('should handle error and send error message', async () => {
    const request = {
      infUser: {
        id: 'userId',
      },
    }

    const expectedError = new Error('Error retrieving matches')
    Matchs.findAll.mockRejectedValue(expectedError)

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(Matchs.findAll).toHaveBeenCalledWith({
      where: {
        [Op.or]: [
          { fk_primeiro_usuario: request.infUser.id },
          { fk_segundo_usuario: request.infUser.id },
        ],
      },
    })
    expect(res.status).toHaveBeenCalledWith(400)
  })
})
