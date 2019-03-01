const uuidv4 = require('uuid/v4')

const { sqlLoader, isValidUrl } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ body }, res) => {
  try {
    const { shortUrl, fullUrl } = body

    if (!shortUrl || !fullUrl)
      return res
        .status(403)
        .send({ message: 'You must provide a valid host URL' })

    if (!isValidUrl.test(shortUrl) || !isValidUrl.test(fullUrl))
      return res.status(400).send({ message: 'Invalid host URL provided!' })

    const hostSql = sqlLoader('checkHostByShortUrl.sql')
    const hosts = await db.query(hostSql, [fullUrl])

    if (hosts.length !== 0)
      return res.status(500).send({ message: 'This host URL already exists' })

    const options = [uuidv4(), fullUrl, shortUrl]
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
