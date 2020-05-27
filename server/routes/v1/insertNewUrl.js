const shortid = require('shortid')

const { generateUuid4 } = require('../../lib')
const {
  sqlLoader,
  isValidUrl,
  getDomainFromUrl,
  removeInitialSlash,
  trailingSlash,
} = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ user, body }, res) => {
  try {
    const { url, short } = body

    if (!url || !user)
      return res.status(403).send({ message: 'Invalid payload' })

    if (!isValidUrl.test(url))
      return res.status(400).send({ message: 'Invalid url provided' })

    const [domain] = url.match(getDomainFromUrl)

    if (!domain)
      return res.status(200).send({ validDomain: false, knownHost: undefined })

    const [host] = await db.query(sqlLoader('checkHost.sql'), [domain])

    if (!host)
      return res.status(200).send({ validDomain: true, knownHost: false })

    const hash = short
      ? trailingSlash(removeInitialSlash(short))
      : shortid.generate()
    const isCustomHash = Boolean(short)

    if (isCustomHash) {
      const [check] = await db.query(
        sqlLoader('checkHostWithCustomHashExist.sql'),
        [host.id, hash]
      )

      if (check.exist === 1) {
        return res.status(400).send({
          message: `The hash ${hash} for the url ${url}, already exist. Please check it.`,
        })
      }
    }

    const uuid = generateUuid4()
    const options = [uuid, hash, url, user.external_id, host.id, isCustomHash]

    const { affectedRows } = await db.query(
      sqlLoader('insertNewUrl.sql'),
      options
    )

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Unable to add new url' })

    const rows = await db.query(sqlLoader('getUrlByExternalId.sql'), [uuid])

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
