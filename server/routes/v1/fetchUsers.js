const { usersQueryLimit } = require('../../constants')
const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { limit, skip } = req.query
    const _limit = Number(limit) || usersQueryLimit
    const _skip = limit && Number(skip) && !isNaN(skip) ? Number(skip) : 0

    const sql = sqlLoader('getUsersPaginated.sql')
    const users = await db.query(sql, [_limit, _skip])

    const countSql = sqlLoader('countUsers.sql')
    const countQuery = await db.query(countSql)

    let count = null
    if (countQuery.length === 1) count = countQuery[0].count

    res.send({ users, count })
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
