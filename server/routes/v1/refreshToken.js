const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  const { refreshToken } = req.body

  if (!refreshToken)
    return res.status(422).send({
      type: 'error',
      message: 'You must provide a valid refresh token.'
    })

  const sql = sqlLoader('getUserByRefreshToken.sql')
  const [user] = await db.query(sql, [refreshToken])

  if (!user)
    return res
      .status(401)
      .send({ type: 'error', message: 'Unauthorized user.' })

  res.send({ success: true })
}
