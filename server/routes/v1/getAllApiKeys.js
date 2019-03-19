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
    const query = await db.query(sql, [limit, skip])
  } catch (e) {
    res.status(500).send({ message: 'Something went wrong.' })
  }
}
