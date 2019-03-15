const ms = require('ms')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

/**
 * @name isExpired
 * @description Helper for check if date setted into JWT.issuedAt still
 *              valid according to timer setted into `config` and value
 *              setted into JWT.expireAt
 * @param {Number} issuedAt - ms since UNIX epoch when token was issued
 * @param {Number} expireAt - ms since UNIX epoch when token still valid
 * @returns {Boolean}       - Still valid?
 */
const isExpired = (issuedAt, expireAt) =>
  issuedAt + ms(process.env.JWT_EXPIRE_IN) < expireAt

const isValidUrl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i

const getDomainFromUrl = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/

/**
 * @name removeInitialSlash
 * @description Remove initial slash from path
 * @param {String} path - Path to check
 * @return {String}
 */
const removeInitialSlash = (path) =>
  path.indexOf('/') === 0 ? path.substr(1) : path

/**
 * @name trailingSlash
 * @description Remove trailing slash
 * @param {String} path - Path to check
 * @return {String}
 */
const trailingSlash = (path) => path.replace(/\/$/, '')

const generateTokens = (user) => {
  const now = Math.floor(Date.now() / 1000)
  const iat = now - 10
  const jti = `SVC-AUTH/${user.external_id}/${uuidv4()}`
  const token = jwt.sign(
    {
      jti,
      iat,
      sub: user,
      nbf: 3000
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
      issuer: process.env.JWT_ISSUER
    }
  )

  const refreshToken = jwt.sign({ user }, process.env.RWT_SECRET, {
    expiresIn: process.env.RWT_EXPIRE_IN,
    issuer: process.env.JWT_ISSUER
  })

  return { token, refreshToken }
}

module.exports = {
  isExpired,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash,
  generateTokens
}
