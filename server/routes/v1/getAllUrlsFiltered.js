const mysql = require('mysql')

const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

const { queryKeys } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const { query: { key, value } } = req

    if (!queryKeys.has(key))
      return res
        .status(400)
        .send({ message: 'Invalid filter options' })

    const sql = sqlLoader('getFilteredUrls.sql')
    const where = queryKeys.get(key)
    const formatted = mysql.format(sql, [where, value])
    const escaped = formatted.replace(`'${where}'`, where)
    const filtered = await db.query(escaped)


    res.send(filtered)
  } catch (e) {
    res
      .status(500)
      .send({ message: 'Invalid filter' })
  }

}
