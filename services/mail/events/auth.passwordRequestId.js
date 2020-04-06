module.exports = {
  params: {
    email: {
      type: 'email',
      normalize: true
    },
    name: {
      type: 'string'
    },
    reset_password_id: {
      type: 'string'
    }
  },

  async handler(ctx) {
    const { email, name, reset_password_id } = ctx.params

    this.actions.send({
      to: email,
      template: 'passwordResetRequest',
      data: {
        name,
        reset_password_id
      }
    })
  }
}