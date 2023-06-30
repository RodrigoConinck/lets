const controller = require('../../controllers/likes/create')
const Likes = require('../../models/likes')
const Matchs = require('../../models/matchs')
const { Op } = require('sequelize')

jest.mock('../../models/likes', () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}))

jest.mock('../../models/matchs', () => ({
  create: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Likes.create.mockClear()
    Likes.findOne.mockClear()
    Matchs.create.mockClear()
  })

  test('should create a new like and check for a match', async () => {
    const request = {
      body: {
        curtidor: 1,
        curtido: 2,
      },
    }

    const expectedLike = { fk_curtidor: 1, fk_curtido: 2 }
    Likes.create.mockResolvedValue(expectedLike)

    const expectedMatch = {
      fk_primeiro_usuario: 2,
      fk_segundo_usuario: 1,
    }
    Likes.findOne.mockResolvedValue({ fk_curtidor: 2, fk_curtido: 1 })
    Matchs.create.mockResolvedValue(expectedMatch)

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(res.send).toHaveBeenCalled()
  })

  test('should create a new like without a match', async () => {
    const request = {
      body: {
        curtidor: 1,
        curtido: 2,
      },
    }

    const expectedLike = { fk_curtidor: 1, fk_curtido: 2 }
    Likes.create.mockResolvedValue(expectedLike)

    Likes.findOne.mockResolvedValue(null) // No match found

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(res.send).toHaveBeenCalled()
    expect(Matchs.create).not.toHaveBeenCalled()
  })

  test('should handle error and send error message', async () => {
    const request = {
      body: {
        curtidor: 1,
        curtido: 2,
      },
    }

    const expectedError = new Error('Error creating like')
    Likes.create.mockRejectedValue(expectedError)

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(res.status).toHaveBeenCalledWith(400)
  })

  test('should throw error if required fields are missing', async () => {
    const request = {
      body: {
        curtidor: 1,
      },
    }

    const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    }

    await controller(request, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status().send).toHaveBeenCalled()
    expect(Likes.create).not.toHaveBeenCalled()
    expect(Likes.findOne).not.toHaveBeenCalled()
    expect(Matchs.create).not.toHaveBeenCalled()
  })
})
