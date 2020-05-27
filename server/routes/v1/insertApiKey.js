const crypto = require('crypto')
const { sqlLoader, getToken, decodeJwt, generateUuid4 } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const token = getToken(req.get('Authorization'))
    const { external_id: userExternalId } = await decodeJwt(token)
    const { issuer } = req.body

    if (!issuer)
      return res.status(400).send({
        message: 'You must provide a valid Issuer for.',
      })

    const rows = await db.query(sqlLoader('checkApiKeyExistence.sql'), [issuer])

    if (rows.length > 0)
      return res.status(417).send({
        message: 'An URL like that already exist on Shorty. Please check it.',
      })

    const apiKey = crypto
      .createHash('sha256')
      .update(generateUuid4())
      .update(issuer)
      .digest('hex')
      .toString()

    const { affectedRows } = await db.query(sqlLoader('insertNewApiKey.sql'), [
      generateUuid4(),
      issuer,
      apiKey,
      userExternalId,
    ])

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Something went terribly wrong' })

    const key = await db.query(sqlLoader('getApiKeyByKey.sql'), [apiKey])

    res.status(201).send({ key })
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
