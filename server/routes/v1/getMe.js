const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const token = getToken(req.get('Authorization'))
    const { external_id: userExternalId } = await decodeJwt(token)

    const [user] = await db.query(sqlLoader('getMeByExternalId.sql'), [
      userExternalId,
    ])

    res.send({ user })
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
