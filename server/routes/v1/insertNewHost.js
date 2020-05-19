const {
  sqlLoader,
  isValidUrl,
  getDomainFromUrl,
  generateUuid4,
} = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ body }, res) => {
  try {
    const { shortUrl, fullUrl } = body

    const domain = fullUrl.match(getDomainFromUrl)[0]

    if (!domain || !isValidUrl.test(domain))
      return res
        .status(422)
        .send({ type: 'error', message: `The domain (${domain}) is not valid` })

    if (!shortUrl || !isValidUrl.test(shortUrl))
      return res
        .status(422)
        .send({ message: 'You must provide a valid short URL' })

    const hostSql = sqlLoader('checkHostByShortUrl.sql')
    const hosts = await db.query(hostSql, [domain])

    if (hosts.length !== 0)
      return res.status(500).send({ message: 'This host URL already exists' })

    const options = [generateUuid4(), domain, shortUrl]
    const insertSql = sqlLoader('insertNewHost.sql')
    const { affectedRows } = await db.query(insertSql, options)

    if (affectedRows !== 1)
      return res.status(500).send({ message: 'Unable to add new host URL' })

    res.sendStatus(201)
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'This host URL already exists.' })
    }

    return res.status(500).send({ message: 'Something went wrong' })
  }
}
