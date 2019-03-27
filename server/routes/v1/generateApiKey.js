const crypto = require('crypto')
const uuidv4 = require('uuid/v4')
const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const token = getToken(req.get('Authorization'))
    const { external_id: userExternalId } = decodeJwt(token)
    const { issuer } = req.body

    if (!issuer)
      return res.status(400).send({
        message: 'You must provide a valid Issuer for.'
      })

    const existSql = sqlLoader('checkApiKeyExistence.sql')
    const rows = await db.query(existSql, [issuer])

    if (rows.length > 0)
      return res.status(417).send({
        message: 'An URL like that already exist on Shorty. Please check it.'
      })

    const apiKey = crypto
      .createHash('sha256')
      .update(uuidv4())
      .update(issuer)
      .digest('hex')
      .toString()

    const sql = sqlLoader('insertNewApiKey.sql')
    const { affectedRows } = await db.query(sql, [
      uuidv4(),
      issuer,
      apiKey,
      userExternalId
    ])

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Something went terribly wrong' })

    const keySql = sqlLoader('getApiKeyByKey.sql')
    const key = await db.query(keySql, [apiKey])

    res.status(201).send({ key })
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
