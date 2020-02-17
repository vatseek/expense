'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async signup({ request, auth, response }) {
    const userData = request.only(['name', 'username', 'email', 'password'])

    try {
      const user = await User.create(userData)
      const token = await auth.generate(user)

      return response.json({
        status: 'success',
        data: token,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem creating the user, please try again later.',
      })
    }
  }

  async login({ request, auth, response }) {
    try {
      const token = await auth.attempt(request.input('email'), request.input('password'))

      return response.json({
        status: 'success',
        data: token,
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password',
      })
    }
  }

  async me({ auth, response }) {
    const user = await User.query()
      .where('id', auth.current.user.id)
      .firstOrFail()

    return response.json({
      status: 'success',
      data: user,
    })
  }

  async updateProfile({ request, auth, response }) {
    try {
      const user = auth.current.user

      user.username = request.input('username')
      user.email = request.input('email')

      await user.save()

      return response.json({
        status: 'success',
        message: 'Profile updated!',
        data: user,
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'There was a problem updating profile, please try again later.',
      })
    }
  }

  async changePassword({ request, auth, response }) {
    const user = auth.current.user
    const verifyPassword = await Hash.verify(request.input('password'), user.password)

    if (!verifyPassword) {
      return response.status(400).json({
        status: 'error',
        message: 'Current password could not be verified! Please try again.',
      })
    }

    user.password = await Hash.make(request.input('newPassword'))
    await user.save()

    return response.json({
      status: 'success',
      message: 'Password updated!',
    })
  }
}

module.exports = UserController
