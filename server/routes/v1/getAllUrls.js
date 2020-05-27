const { queryLimit } = require('../../constants')
const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

/**
 * @method GET
 * @name getAllUrls
 * @description Fetch stored shorted urls
 * @path /api/v1/urls
 * @query {Number} limit - Optional limit to get default 10
 * @query {Number} skip  - Optional fields to skip default 0
 * @returns All shorted urls with pagination
 */

module.exports = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || queryLimit
    const skip =
      req.query.limit && Number(req.query.skip) && !isNaN(req.query.skip)
        ? Number(req.query.skip)
        : 0

    const urls = await db.query(sqlLoader('getUrlsPaginated.sql'), [
      limit,
      skip,
    ])
    const countQuery = await db.query(sqlLoader('countUrls.sql'))

    let count = null
    if (countQuery.length === 1) count = countQuery[0].count

    res.status(200).send({ urls, count })
  } catch (e) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
