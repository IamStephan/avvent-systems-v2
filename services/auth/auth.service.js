'use strict'
const DbService = require('moleculer-db')
const MongoDBAdapter = require('moleculer-db-adapter-mongo')

module.exports = {
  name: 'auth',
  version: 'v1',

  mixins: [DbService],
  adapter: new MongoDBAdapter('mongodb+srv://stephan_test:12344321@cluster0-v1ld8.mongodb.net/avvent_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }),
  collection: 'auth',
  settings: {
    idField: '_id',
    fields: [
      '_id',
      'user_id',
      'refresh_tokens',
      'reset_password_id'
    ]
  },

  actions: {
    // Published
    deleteUser: { ...require('./actions/deleteUser.action') },
    login: { ...require('./actions/login.action') },
    logout: { ...require('./actions/logout.action') },
    signup: { ...require('./actions/signup.actions') },
    token: { ...require('./actions/token.action') },
    requestPasswordReset: { ...require('./actions/requestPasswordReset.action') },
    resetPassword: { ...require('./actions/resetPassword.action') },

    // Public
    authorize: { ...require('./actions/authorize.action') }
  },

  methods: {
    generateToken: require('./methods/generateToken.method'),
    verifyToken: require('./methods/verifyToken.method'),

    generatePasswordResetId: require('./methods/generatePasswordResetId.method'),
    setPasswordResetId: require('./methods/setPasswordResetId.method'),
    addRefreshTokenById: require('./methods/addRefreshTokenById.method'),
    addRefreshTokenByUserId: require('./methods/addRefreshTokenByUserId.method'),
    comparePassword: require('./methods/comparePassword.method'),
    createAuthEntity: require('./methods/createAuthEntity.method'),
    entityExistByUser: require('./methods/entityExistByUser.method'),
    generatedHashedPassword: require('./methods/generateHashedPassword.method'),
    getAuthEntityByUserId: require('./methods/getAuthEntityByUserId.method'),
    refreshTokenExists: require('./methods/refreshTokenExists.method'),
    removeAllRefreshTokens: require('./methods/removeAllRefreshTokens.method'),
    removeAuthEntity: require('./methods/removeAuthEnity.method'),
    removeRefreshToken: require('./methods/removeRefreshToken.method'),
  },

  events: {

  }
}

