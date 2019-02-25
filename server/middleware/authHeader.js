const jwt = require('express-jwt')

const { authHeaderKey } = require('../constants')
const { sqlLoader, isExpired } = require('../lib')
const { pool: db } = require('../config')

module.exports = async (req, res, next) => {
  const authHeader = req.get('authorization')
  const authKey = req.get(authHeaderKey)

  if (!authHeader && !authKey) return res.sendStatus(401)

  if (authHeader && !authKey) {
    try {
      const parts = authHeader.split(' ')

      if (parts.length !== 2 || parts[0] !== 'Bearer')
        throw new Error('Invalid authentication header')

      const verified = jwt.verify(parts[1], process.env.JWT_SECRET)
      // const isInBlacklist = await redis.exists(verified.jti)
      const isInBlacklist = false
      const now = Date.now()

      if (isInBlacklist) return res.sendStatus(403)

      if (
        verified.nbf > now || // Not before now
        verified.iss !== process.env.JWT_ISSUER || // Same issuer
        isExpired(verified.iat, verified.exp) // Is expired
      )
        return res.sendStatus(403)
    } catch (error) {
      console.error('error', error)
      return res.sendStatus(403)
    }
  } else if (!authHeader && authKey) {
    const sql = sqlLoader('checkAuthorizationKey.sql')
    const query = await db.query(sql, [authHeader])

    if (query.length === 0) return res.sendStatus(403)
  } else return res.sendStatus(403)

  next()
}
