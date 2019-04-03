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
    let totalClick = 0

    for (const row of rows) {
      if (!shortUrl) shortUrl = row.shortUrl
      if (!targetUrl) targetUrl = row.targetUrl

      // Update total click counter
      totalClick += row.total

      // Build Click Map
      if (dayMap.hasOwnProperty(row.clickDate)) {
        const tmp = dayMap[row.clickDate]
        dayMap[row.clickDate] = tmp + row.total
      } else {
        dayMap[row.clickDate] = row.total
      }

      // Build Browser Map
      const dailyBrowsers = row.browser.split(',')
      for (const browser of dailyBrowsers) {
        if (browserMap.hasOwnProperty(browser)) {
          const tmp = browserMap[browser]
          browserMap[browser] = tmp + 1
        } else {
          browserMap[browser] = 1
        }
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
      totalClick
    })
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
