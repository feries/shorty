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

const isEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

const generateUuid4 = () => uuidv4()

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

/**
 * @private
 * @name _validateFormat
 * @description Validate Authorization header format, if it's composed like `Bearer <TOKEN>`.
 *              It return `false` if the provided input has wrong format, instead it return an
 *              array with in first position the `Bearer` key and the give token in second.
 * @param {String} authHeader - The request authorization header
 * @returns {String[]}
 */
const _validateFormat = (authHeader) => {
  const parts = authHeader.split(' ')
  if (!parts || parts.length !== 2)
    throw new Error('Authorization header has a wrong format')

  return parts
}

/**
 * @private
 * @name _validateScheme
 * @description Validate the Authorization header composition given from @see{validateFormat} function.
 *              It expext an array as input with `Bearer` at first position and the issued token at second.
 * @param {String[]} schemeAndToken
 * @returns {String} Json Web Token
 */
const _validateScheme = (schemeAndToken) => {
  const authScheme = schemeAndToken[0]
  if (authScheme !== 'Bearer')
    throw new Error('Authorization header has a wrong scheme')

  return schemeAndToken[1]
}

/**
 * @name getToken
 * @description Simple wrapper function to process Authorization header from a given request,
 *              for simple check to match format and schema. `Micro` errors are thrown in each
 *              invalid case. If everithing goes right the encoded token are returned.
 * @param {String} authHeader - request authorization header
 */
const getToken = (authHeader) => {
  if (!authHeader) throw new Error('Missing authorization header')
  return _validateScheme(_validateFormat(authHeader))
}

const decodeJwt = (token) => {
  if (!token) throw new Error('Missing token.')
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    return verified.sub
  } catch (e) {
    throw new Error('Invalid token provided')
  }
}

module.exports = {
  isEmail,
  isExpired,
  generateUuid4,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash,
  generateTokens,
  getToken,
  decodeJwt
}
