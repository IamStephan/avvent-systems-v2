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
    }
  },

  async handler(ctx) {
    const {username, email, password } = ctx.params

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

    let hashed = user.password

    let comparison = await this.comparePassword({password, hashed})

    if(!comparison) {
      throw new MoleculerError('Credentials are incorrect', 401, 'Credentials are incorrect')
    }

    const user_id = user._id

    const authEntityExists = await this.authExists({ user_id })
 
    const access_token = this.generateToken({ type: 'access', user_id: user._id, verified: user.verified })
    const refresh_token = this.generateToken({ type: 'refresh', user_id: user._id })

    if(!authEntityExists) {
      let user_id = user._id
      await this.createAuth({ user_id })
    }

    let auth = await this.getAuth({ user_id })

    await this.addRefreshToken(auth._id, {refresh_token})

    return {
      access_token,
      refresh_token
    }
  }
}