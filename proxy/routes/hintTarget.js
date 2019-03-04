const userAgent = require('express-useragent')
const uuidv4 = require('uuid/v4')

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
      isProd ? 'https://feri.es/404' : 'http://localhost:3000/404'
    )

  const { id, targetUrl } = rows[0]

  const { browser, os, isMobile, isTablet, isDesktop } = userAgent.parse(ua)

  const browserQuery = sqlLoader('insertBrowserIfNotExist.sql')
  const osQuery = sqlLoader('insertOsIfNotExist.sql')

  await db.query(browserQuery, [uuidv4(), browser, browser])
  await db.query(osQuery, [uuidv4(), os, os])

  const geo = {}

  const insert = sqlLoader('insertUrlHint.sql')

  await db.query(insert, [
    id,
    browser,
    os,
    isMobile,
    isTablet,
    isDesktop,
    referer,
    ip
  ])

  res.redirect(301, targetUrl)
}
