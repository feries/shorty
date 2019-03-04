const shortid = require('shortid')
const uuidv4 = require('uuid/v4')

const {
  sqlLoader,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash
} = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ user, body }, res) => {
  try {
    const { url, short } = body

    if (!url || !user)
      return res.status(403).send({ message: 'Invalid payload' })

    if (!isValidUrl.test(url))
      return res.status(400).send({ message: 'Invalid url provided' })

    const hostSql = sqlLoader('checkHost.sql')
    const domain = url.match(getDomainFromUrl)

    if (domain.length === 0)
      return res.status(200).send({ status: true, host: false })

    const hosts = await db.query(hostSql, [domain[0]])

    if (hosts.length === 0)
      return res.status(200).send({ status: true, host: false })
    else if (hosts.length > 1)
      return res.status(500).send({ message: 'Something went wrong' })

    const hash = removeInitialSlash(short) || shortid.generate()
    const isCustomHash = Boolean(short)
    const uuid = uuidv4()
    const options = [
      uuid,
      hash,
      url,
      user.sub.external_id,
      hosts[0].id,
      isCustomHash
    ]
    const insertSql = sqlLoader('insertNewUrl.sql')
    const { affectedRows } = await db.query(insertSql, options)

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Unable to add new url' })

    const insertedUrl = sqlLoader('getUrlByExternalId.sql')
    const rows = await db.query(insertedUrl, [uuid])

    if (rows.length !== 1)
      return res.status(500).send({ message: 'Something went wrong' })

    res.status(201).send(rows[0])
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'This url already exists.' })
    }

    return res.status(500).send({ message: 'Something went wrong' })
  }
}
