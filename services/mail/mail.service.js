const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const { MoleculerError, MoleculerRetryableError } = require('moleculer').Errors
const nodemailer = require('nodemailer')
const htmlToText = require('nodemailer-html-to-text').htmlToText
const EmailTemplate = require('email-templates').EmailTemplate
const Promise = require('bluebird')

module.exports = {
  name: 'mail',
  version: 'v1',

  settings: {
    templateFolder: path.join(__dirname, 'templates'),
    transport: {
      service: 'gmail',
      auth: {
        user: 'avventsystemstest@gmail.com',
        pass: '12344321PooP'
      }
    }
  },


	actions: {
		send: {
			handler(ctx) {
				const data = _.defaultsDeep(
					ctx.params.data || {},
					this.settings.data
				)
				if (ctx.params.template) {
					const templateName = ctx.params.template
					// Use templates
					const template = this.getTemplate(templateName)
					if (template) {
						// Render template
						return template
							.render(data || {}, ctx.params.locale)
							.then((rendered) => {
								const params = _.omit(ctx.params, [
									'template',
									'locale',
									'data',
								])
								params.html = rendered.html
								if (rendered.text) params.text = rendered.text
								if (rendered.subject)
									params.subject = rendered.subject

								// Send e-mail
								return this.send(params)
							})
					}
					return Promise.reject(
						new MoleculerError(
							'Missing e-mail template: ' + templateName
						)
					)
				} else {
					// Send e-mail
					const params = _.omit(ctx.params, [
						'template',
						'locale',
						'data',
					])
					return this.send(params)
				}
			},
		},
  },
  
	methods: {
		getTemplate(templateName) {
			if (this.templates[templateName]) {
				return this.templates[templateName]
			}

			const templatePath = path.join(
				this.settings.templateFolder,
				templateName
			)
			if (fs.existsSync(templatePath)) {
				this.templates[templateName] = new EmailTemplate(templatePath)
				Promise.promisifyAll(this.templates[templateName])

				return this.templates[templateName]
			}
		},
		send(msg) {
			return new Promise((resolve, reject) => {
				this.logger.debug(
					`Sending email to ${msg.to} with subject '${msg.subject}'...`
				)

				if (!msg.from) msg.from = this.settings.from

				if (this.transporter) {
					this.transporter.sendMail(msg, (err, info) => {
						if (err) {
							this.logger.warn('Unable to send email: ', err)
							reject(
								new MoleculerRetryableError(
									'Unable to send email! ' + err.message
								)
							)
						} else {
							this.logger.info(
								'Email message sent.',
								info.response
							)
							resolve(info)
						}
					})
				} else
					return reject(
						new MoleculerError(
							'Unable to send email! Invalid mailer transport: ' +
								this.settings.transport
						)
					)
			})
		},
  },
  
  events: {
    'auth.verify': require('./events/auth.verify'),
    'auth.passwordRequestId': require('./events/auth.passwordRequestId'),
    'auth.passwordReset': require('./events/auth.passwordReset')
  },


	created() {
		this.templates = {}
		if (this.settings.templateFolder) {
			if (!fs.existsSync(this.settings.templateFolder)) {
				/* istanbul ignore next */
				this.logger.warn(
					'The templateFolder is not exists! Path:',
					this.settings.templateFolder
				)
			}
		}

		if (_.isFunction(this.createTransport)) {
			this.transporter = this.createTransport()
		} else {
			if (!this.settings.transport) {
				this.logger.error('Missing transport configuration!')
				return
			}

			this.transporter = nodemailer.createTransport(
				this.settings.transport
			)
		}

		if (this.transporter) {
			if (this.settings.htmlToText)
				this.transporter.use('compile', htmlToText())
		}
	},
}
