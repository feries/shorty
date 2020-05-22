const { authHeaderKey } = require('../constants')
const { sqlLoader } = require('../lib')
const { pool: db } = require('../config')

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization')
  const authKey = req.get(authHeaderKey)
  const { rwt } = req.body

  if (!authHeader && !authKey && !rwt) return res.sendStatus(401)

  if (authHeader) return next()

  if (rwt) return next('route')

  const query = await db.query(sqlLoader('checkAuthorizationKey.sql'), [
    authHeader,
  ])

  if (query.length === 0) return res.sendStatus(403)

  next('route')
}
