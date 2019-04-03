const shortid = require('shortid')
const uuidv4 = require('uuid/v4')

const {
  sqlLoader,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash
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

    const [host] = await db.query(hostSql, [domain[0]])

    if (!host) return res.status(200).send({ status: true, host: false })

    const hash = trailingSlash(removeInitialSlash(short)) || shortid.generate()
    const isCustomHash = Boolean(short)

    if (isCustomHash) {
      const checkSql = sqlLoader('checkHostWithCustomHashExist.sql')
      const [check] = await db.query(checkSql, [host.id, hash])

      if (check.exist === 1) {
        return res.status(400).send({
          message: `The hash ${hash} for the url ${url}, already exist. Please check it.`
        })
      }
    }

    const uuid = uuidv4()
    const options = [
      uuid,
      hash,
      url,
      user.sub.external_id,
      host.id,
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
