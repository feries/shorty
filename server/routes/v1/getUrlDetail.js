const dayjs = require('dayjs')
const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')
const { queryRange, RANGE_ALL } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const { id, range } = req.params

    if (!id) return res.status(400).send({ message: 'Missing URL id to check' })

    let hasRange = range !== undefined
    let startDate = null
    let endDate = dayjs(Date.now()).add(1, 'day')

    if (hasRange) {
      if (!queryRange.has(range) || range === RANGE_ALL) hasRange = false
      else startDate = dayjs(Date.now()).subtract(1, range)
    }

    const sql = sqlLoader('getUrlDetailByExternalId.sql')
    const rows = await db.query(sql, [`${id}`, hasRange, startDate, endDate])

    if (rows.affectedRows !== 1)
      return res.status(500).send({ message: 'Terrible implementation' })

    res.send(rows)
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
