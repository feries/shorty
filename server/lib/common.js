const ms = require('ms')

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

module.exports = {
  isExpired,
  isValidUrl
}
