const fs = require('fs')
const nodemailer = require('nodemailer')
const { markdown } = require('nodemailer-markdown')

const { isEmail } = require('./common')
const { registration } = require('../constants')

/**
 * Nodemailer abstract class
 * https://nodemailer.com
 * @property {transporter} transporter - an object that is able to send mail
 *
 */
class Nodemailer {
  /**
   * Create transporter
   */
  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PWD
        }
      })

      this.tempaltes = new Map()
      this.tempaltes.set(registration, 'registration.md')

      this.mailSubjects = new Map()
      this.mailSubjects.set(registration, `Welcome on board at Shorty`)

      this.mailParams = new Map()
      this.mailParams.set(registration, [
        'name',
        'url',
        'user',
        'email',
        'activationToken'
      ])

      this.config()
    } catch (error) {
      return new Error('Error while initializing mail transporter.')
    }
  }

  config() {
    this.transporter.use('compile', markdown({ useEmbeddedImages: false }))
  }

  _getMarkdownFor(template) {
    const path = process.env.SERVER_PUBLIC_PATH
    const pageName = this.tempaltes.get(template)
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
    const filePath = `${normalizedPath}/${pageName}`

    if (!fs.existsSync(filePath)) throw new Error('Template not exist.')

    return fs.readFileSync(filePath, 'utf8')
  }

  _parser(str, data) {
    return str.replace(/\{(.*?)\}/g, (_, a) => data[a])
  }

  _matchParams(template, params) {
    const array1 = this.mailParams.get(template)
    const array2 = Object.keys(params)

    return (
      array1.length === array2.length &&
      array1.sort().every((value, index) => value === array2.sort()[index])
    )
  }

  prepare(template, params) {
    const validParams = this._matchParams(template, params)

    if (!validParams) throw new Error('Provided params are invalid')

    const templateString = this._getMarkdownFor(template)
    return this._parser(templateString, params)
  }

  /**
   * Send mail
   * @param {String} to - recipient's email address
   * @param {String} template - which template should be used
   * @param {Object} templateParams - Params to replace in MD
   * @return {Promise<Object|Error>} resolve info object of nodemailer if success
   * @throw {Error} if the transporter is not verified
   *
   */
  async send(to, template, templateParams) {
    try {
      if (!isEmail(to)) return new Error('Invalid recipient address.')

      if (!template)
        return new Error(
          'You must provide a valid template name or message to deliver.'
        )

      let message = template
      let isMd = false

      if (this.tempaltes.has(template)) {
        message = this.prepare(template, templateParams)
        isMd = true
      }

      const verified = await this.transporter.verify()

      if (!verified)
        return new Error('Error while setting up email transporter')

      const mailOptions = {
        from: process.env.MAIL_SENDER,
        to,
        subject: this.mailSubjects.get(template),
        ...(isMd && { markdown: message }),
        ...(!isMd && { text: message })
      }

      const sent = await this.transporter.sendMail(mailOptions)

      if (sent.accepted.length !== 1)
        return new Error('Error when sending email.')

      return true
    } catch (error) {
      console.error(error)
      throw new Error('Error while sending email.')
    }
  }
}

module.exports = {
  Nodemailer
}
