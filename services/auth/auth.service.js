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
    deleteUser: require('./actions/deleteUser.action'),
    login: require('./actions/login.action'),
    logout: require('./actions/logout.action'),
    signup: require('./actions/signup.actions'),
    token: require('./actions/token.action'),
    requestPasswordReset: require('./actions/requestPasswordReset.action'),
    resetPassword: require('./actions/resetPassword.action'),

    // Public
    authorize: require('./actions/authorize.action')
  },

  methods: {
    addRefreshToken: require('./methods/addRefreshToken.method'),
    authExists: require('./methods/authExists.method'),
    comparePassword: require('./methods/comparePassword.method'),
    createAuth: require('./methods/createAuth.method'),
    generatePassword: require('./methods/generatePassword.method'),
    generateToken: require('./methods/generateToken.method'),
    getAuth: require('./methods/getAuth.method'),
    refreshTokenExists: require('./methods/refreshTokenExists.method'),
    removeAuth: require('./methods/removeAuth.method'),
    removeRefreshToken: require('./methods/removeRefreshToken.method'),
    updateAuth: require('./methods/updateAuth.method'),
    verifyToken: require('./methods/verifyToken.method'),
  },

  events: {

  }
}

