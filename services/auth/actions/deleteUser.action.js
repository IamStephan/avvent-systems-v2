const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    email: {
      type: 'email',
      normalize: true,
      optional: true
    },
    username: {
      type: 'string',
      min: 1,
      max: 16,
      optional: true
    },
    password: {
      type: 'string',
    },
    refresh_token: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const {username, email, password, refresh_token } = ctx.params
    let user

    if(!username && !email) {
      throw new MoleculerError('Insufficient credentials', 404, 'Please provide a username or password')
    }

    if(email) {
      user = await ctx.call('v1.users.getUserSensitive', { email })
    } else {
      user = await ctx.call('v1.users.getUserSensitive', { username })
    }

    if(!user) {
      throw new MoleculerError('User does not exist', 404, 'User does not exist')
    }

    const refresh_decoded = this.verifyToken({ type: 'refresh', refresh_token })

    if(user._id.toString() !== refresh_decoded.id) {
      throw new MoleculerError('Refresh token and user do not match', 401)
    }

    let comparison = await this.comparePassword(password, user.password)

    if(!comparison) {
      throw new MoleculerError('Credentials are incorrect', 401, 'Credentials are incorrect')
    }

    const user_id = user._id

    const authEntityExists = await this.authExists({ user_id })

    if(authEntityExists) {
      let authEnitity = await this.getAuth({ user_id })
      await this.removeAuthEntity(authEnitity._id)
    }

    await ctx.call('v1.users.removeUser', {
      user_id: user._id.toString()
    })
  }
}