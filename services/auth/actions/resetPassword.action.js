const { MoleculerError } = require('moleculer').Errors

module.exports = {
  visibility: 'published',

  params: {
    email: {
      type: 'email',
      normalize: true
    },
    reset_password_id: {
      type: 'string'
    },
    new_password: {
      type: 'custom',
      check(value) {
        let flaws = []

        if(typeof value !== 'string') {
          return [{ type: 'type', expected: 'string', actual: typeof value }]
        }

        if(/(\s)/g.test(value)) {
          return [{ type: 'validation', expected: 'Cannot contain any whitespace' }]
        }

        let tests = [
          {
            pattern: /^(.){8,}$/g,
            message: 'Password must be longer that 8 characters'
          },
          {
            pattern: /([A-Z])/g,
            message: 'At least one upper case English letter'
          },
          {
            pattern: /([a-z])/g,
            message: 'At least one lower case English letter'
          },
          {
            pattern: /([0-9])/g,
            message: 'At least one digit'
          },
          {
            pattern: /([#?!@$%^&*-])/g,
            message: 'At least one special character'
          }
        ]

        for(let i = 0; i < tests.length; i++) {
          if(!tests[i].pattern.test(value)) {
            flaws.push({ type: 'validation', expected: tests[i].message })
          }
        }

        return flaws.length === 0 ? true : flaws
      }
    }
  },

  async handler(ctx) {
    const { email, reset_password_id, new_password } = ctx.params

    const user = await ctx.call('v1.users.getUser', { email })

    if(!user) {
      throw new MoleculerError('User not found', 404)
    }

    let user_id = user._id

    let auth_entity = await this.getAuth({ user_id })

    if(!auth_entity) {
      throw new MoleculerError('User did not request a password reset', 404)
    }

    if(!auth_entity.reset_password_id) {
      throw new MoleculerError('User did not request a password reset', 404)
    }

    if(auth_entity.reset_password_id !== reset_password_id) {
      throw new MoleculerError('Not a valid reset id', 409)
    }

    const password = new_password
    const new_password_h = await this.generatePassword({type: 'hash', password})

    let auth_id = auth_entity._id
    
    await this.updateAuth(auth_id, { reset_password_id: '' })
    await this.removeRefreshToken(auth_id, { universal: true })

    await ctx.call('v1.users.resetPassword', {
      user_id: user._id.toString(),
      new_password: new_password_h
    })

    this.broker.emit('auth.passwordReset', {
      email,
      name: `${user.first_name} ${user.last_name}`
    })

  }
}