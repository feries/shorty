const { queryLimit } = require('../../constants')
const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || queryLimit
    const skip =
      req.query.limit && Number(req.query.skip) && !isNaN(req.query.skip)
        ? Number(req.query.skip)
        : 0

    const sql = sqlLoader('getApiKeys.sql')
    const keys = await db.query(sql, [limit, skip])

    const countSql = sqlLoader('countKeys.sql')
    const countQuery = await db.query(countSql)

    let count = null
    if (countQuery.length === 1) count = countQuery[0].count

    res.send({ keys, count })
  } catch (e) {
    res.status(500).send({ message: 'Something went wrong.' })
  }
}
