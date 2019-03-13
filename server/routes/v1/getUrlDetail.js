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
    let endDate = dayjs(Date.now())
      .add(1, 'day')
      .format('YYYY-MM-DD')

    if (hasRange) {
      if (!queryRange.has(range) || range === RANGE_ALL) hasRange = false
      else
        startDate = dayjs(Date.now())
          .subtract(1, range)
          .format('YYYY-MM-DD')
    }

    const sql = sqlLoader('getUrlDetailByExternalId.sql')
    const rows = await db.query(sql, [`${id}`, hasRange, startDate, endDate])
    const totalRecords = rows.length

    if (totalRecords === 0) return res.send({ rows: [] })

    const dayMap = {}
    const browserMap = {}
    const osMap = {}
    let shortUrl = null
    let targetUrl = null

    for (const row of rows) {
      if (!shortUrl) shortUrl = row.shortUrl
      if (!targetUrl) targetUrl = row.targetUrl

      // Build Click Map
      if (dayMap.hasOwnProperty(row.click_date)) {
        const tmp = dayMap[row.click_date]
        dayMap[row.click_date] = tmp + row.total
      } else {
        dayMap[row.click_date] = row.total
      }

      // Build Browser Map
      if (browserMap.hasOwnProperty(row.browser)) {
        const tmp = browserMap[row.browser]
        browserMap[row.browser] = tmp + 1
      } else {
        browserMap[row.browser] = 1
      }

      // Build OS Map
      if (osMap.hasOwnProperty(row.os)) {
        const tmp = osMap[row.os]
        osMap[row.os] = tmp + 1
      } else {
        osMap[row.os] = 1
      }
    }

    res.send({
      dayMap,
      browserMap,
      osMap,
      shortUrl,
      targetUrl,
      totalClick: totalRecords
    })
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}