const { sqlLoader, generateTokens } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { rwt } = req.body

    if (!rwt)
      return res.status(422).send({
        type: 'error',
        message: 'You must provide a valid refresh token.'
      })

    const sql = sqlLoader('getUserByRefreshToken.sql')
    const [user] = await db.query(sql, [rwt])

    if (!user)
      return res
        .status(401)
        .send({ type: 'error', message: 'Unauthorized user.' })

    const userId = user.id

    delete user.password
    delete user.id
    delete user.account_enabled
    delete user.refresh_token

    const { token, refreshToken, expiresIn } = generateTokens(user)

    if (!token || !refreshToken || !expiresIn)
      return res
        .status(500)
        .send({ type: 'error', message: 'Something went wrong.' })

    const updateUserRefreshToken = sqlLoader('updateUserRefreshToken.sql')
    await db.query(updateUserRefreshToken, [refreshToken, userId])

    res.status(201).send({ token, refreshToken, expiresIn })
  } catch (error) {
    res.status(500).send({ type: 'error', message: 'Something went wrong.' })
  }
}
