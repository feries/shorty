const sqlLoader = require('./sqlLoader')
const unless = require('./middlewareSkipper')
const { Nodemailer } = require('./mailer')

const {
  isEmail,
  isExpired,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash,
  generateTokens,
  getToken,
  decodeJwt,
  generateUuid4
} = require('./common')

module.exports = {
  isEmail,
  sqlLoader,
  unless,
  isExpired,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash,
  generateTokens,
  getToken,
  decodeJwt,
  generateUuid4,
  Nodemailer
}
