const userAgent = require('express-useragent')
const { v4 } = require('uuid')

const { sqlLoader } = require('../lib')
const { pool: db } = require('../config')

const isProd = process.env.NODE_ENV !== 'development'

module.exports = async (req, res) => {
  const ua = req.get('user-agent')
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const referer = req.headers.referrer || req.headers.referer || 'other'

  const { shortid } = req.params

  const sql = sqlLoader('getUrlByShort.sql')
  const rows = await db.query(sql, [shortid])

  if (rows.length !== 1)
    return res.redirect(
      isProd
        ? `${process.env.DOMAIN}/404`
        : `http://localhost:${process.env.PORT}/404`
    )

  const { id, targetUrl } = rows[0]

  const { browser, os, isMobile, isTablet, isDesktop } = userAgent.parse(ua)
  const deviceType = isMobile
    ? 'mobile'
    : isTablet
    ? 'tablet'
    : isDesktop
    ? 'desktop'
    : 'other'

  const browserQuery = sqlLoader('insertBrowserIfNotExist.sql')
  const osQuery = sqlLoader('insertOsIfNotExist.sql')
  const deviceQuery = sqlLoader('getDeviceTypeId.sql')

  await db.query(browserQuery, [v4(), browser, browser])
  await db.query(osQuery, [v4(), os, os])

  const [device] = await db.query(deviceQuery, deviceType)

  // TODO: Find user Geo
  const geo = ''

  const insert = sqlLoader('insertUrlHint.sql')

  await db.query(insert, [id, browser, os, device.id, referer, geo])

  res.redirect(301, targetUrl)
}
