const controller = require('../../controllers/users/login')
const Usuario = require('../../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../models/usuario', () => ({
  findOne: jest.fn(),
}))

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}))

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}))

describe('Your Controller', () => {
  beforeEach(() => {
    Usuario.findOne.mockClear()
    bcrypt.compare.mockClear()
    jwt.sign.mockClear()
  })

  test('should find user, compare password, sign token, and send it', async () => {
    const request = {
      body: {
        email: 'test@example.com',
        senha: 'password123',
      },
    }

    const expectedUser = { id: 1, email: 'test@example.com', senha: 'hashedPassword' }
    Usuario.findOne.mockResolvedValue(expectedUser)

    const isMatch = true
    bcrypt.compare.mockResolvedValue(isMatch)

    const expectedToken = 'jsonwebtoken'
    jwt.sign.mockReturnValue(expectedToken)

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.findOne).toHaveBeenCalledWith({
      raw: true,
      where: {
        email: request.body.email,
      },
    })
    expect(bcrypt.compare).toHaveBeenCalledWith(request.body.senha, expectedUser.senha)
    expect(jwt.sign).toHaveBeenCalledWith(expectedUser, process.env.SEGREDOJWT)
  })

  test('should handle error and send error message', async () => {
    const request = {
      body: {
        email: 'test@example.com',
        senha: 'password123',
      },
    }

    Usuario.findOne.mockResolvedValue(null)

    const res = {
      send: jest.fn(),
    }

    await controller(request, res)

    expect(Usuario.findOne).toHaveBeenCalledWith({
      raw: true,
      where: {
        email: request.body.email,
      },
    })
    expect(bcrypt.compare).not.toHaveBeenCalled()
    expect(jwt.sign).not.toHaveBeenCalled()
  })
})
