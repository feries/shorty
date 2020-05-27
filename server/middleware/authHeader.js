const { authHeaderKey } = require('../constants')
const { sqlLoader, verifyJwt, getToken } = require('../lib')
const { pool: db } = require('../config')

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  const authKey = req.get(authHeaderKey)
  const { rwt } = req.body

  if (!authHeader && !authKey && !rwt) return res.sendStatus(403)

  if (authHeader) {
    const verified = await verifyJwt(getToken(authHeader))

    if (!verified) return res.sendStatus(401)

    return next()
  }

  if (rwt) return next('route')

  const [service] = await db.query(sqlLoader('checkAuthorizationKey.sql'), [
    authKey,
  ])

  if (!service) return res.sendStatus(403)

  req.user = service

  next('route')
}
