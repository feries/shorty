const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { kind, value } = req.body
    const jwt = getToken(req.get('authorization'))
    const user = await decodeJwt(jwt)

    const sql = sqlLoader('insertOrUpdateContact.sql')
    await db.query(sql, [user.external_id, kind, value, value])

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send({ message: 'Something went wrong.' })
  }
}
