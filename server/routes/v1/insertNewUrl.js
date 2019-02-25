const shortid = require('shortid')
const uuidv4 = require('uuid/v4')

const { sqlLoader, isValidUrl } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async ({ user, body }, res) => {
  const { url } = body

  if (!url || !user) return res.status(403).send({ message: 'Invalid payload' })

  if (!isValidUrl.test(url))
    return res.status(400).send({ message: 'Invalid url' })

  const options = [uuidv4(), shortid.generate(), url, user.sub.id]
  const insertSql = sqlLoader('insertNewUrl.sql')
}
