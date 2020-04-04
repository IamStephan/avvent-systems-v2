'use strict';

const ApiGateway = require('moleculer-web');

module.exports = {
	name: 'api',
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		// Exposed port
		port: process.env.PORT || 3000,

		// Exposed IP
		ip: '0.0.0.0',

		routes: [
			{
				path: '/core',

				whitelist: [
					'v1.users.**',
					'v1.auth.**'
				],

				// Enable/disable parameter merging method. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Disable-merging
				mergeParams: true,

				// The auto-alias feature allows you to declare your route alias directly in your services.
				// The gateway will dynamically build the full routes from service schema.
				autoAliases: false,

				aliases: {
					'POST /signup': 'v1.auth.signup',
					'POST /login': 'v1.auth.login',
					'POST /logout': 'v1.auth.logout',
					'POST /deleteUser': 'v1.auth.deleteUser',
					'POST /token': 'v1.auth.token',
					'POST /requestPasswordReset': 'v1.auth.requestPasswordReset',
					'POST /resetPassword': 'v1.auth.resetPassword',

					'POST /verify': 'v1.users.verifyUser'
				},

				bodyParsers: {
					json: {
						strict: false,
						limit: '1MB'
					},
					urlencoded: {
						extended: true,
						limit: '1MB'
					}
				},

				// Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
				mappingPolicy: 'restrict', // Available values: 'all', 'restrict'

				// Enable/disable logging
				logging: true
			}
		],

		// Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
		log4XXResponses: false,
		// Logging the request parameters. Set to any log level to enable it. E.g. 'info'
		logRequestParams: null,
		// Logging the response data. Set to any log level to enable it. E.g. 'info'
		logResponseData: null,
	},

	methods: {}
};
