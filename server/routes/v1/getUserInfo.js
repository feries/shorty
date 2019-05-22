const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const token = getToken(req.get('Authorization'))
    const _user = decodeJwt(token)

    const sql = sqlLoader('getUserDataByExternalId.sql')
    const contacts = await db.query(sql, _user.external_id)

    const normalizedContacts = {}
    for (const contact of contacts) {
      normalizedContacts[contact.type] = contact.value
    }
    normalizedContacts['email'] = _user.email

    res.send({ ...normalizedContacts })
  } catch (e) {
    res.status(500).send({ message: 'Terrible implementation' })
  }
}
