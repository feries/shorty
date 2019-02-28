const shortid = require('shortid')
const uuidv4 = require('uuid/v4')

const { sqlLoader, isValidUrl } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ user, body }, res) => {
  try {
    const { url } = body

    if (!url || !user) return res.status(403).send({ message: 'Invalid payload' })

    if (!isValidUrl.test(url))
      return res.status(400).send({ message: 'Invalid url' })

    const options = [uuidv4(), shortid.generate(), url, user.sub.external_id]
    const insertSql = sqlLoader('insertNewUrl.sql')
    const { affectedRows } = await db.query(insertSql, options)

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Unable to add new url' })

    const [externalId, shortedUrl, targetUrl] = options
    res.status(201).send({ externalId, shortedUrl, targetUrl, urlClick: 0 })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'This url already exists.'})
    }

    return res.status(500).send({ message: 'Something went wrong' })
  }
}
