const userAgent = require('express-useragent')

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

  const {
    browser,
    isAndroid,
    isAndroidTablet,
    isChrome,
    isChromeOS,
    isCurl,
    isDesktop,
    isEdge,
    isFirefox,
    isIE,
    isiPad,
    isiPhone,
    isiPod,
    isKindleFire,
    isLinux,
    isLinux64,
    isMac,
    isOpera,
    isPhantomJS,
    isRaspberry,
    isSafari,
    isSamsung,
    isSmartTV,
    isTablet,
    isWindows,
    isWindowsPhone,
    os,
    platform,
    source,
    version,
    ...rest
  } = userAgent.parse(ua)

  const _isAndroid = isAndroid || isAndroidTablet
  const _isChrome = isChrome || isChromeOS
  const _isIE = isEdge || isWindows || isWindowsPhone || isIE
  const _isSafari = isSafari
  const _isOpera = isOpera
  const _isFirefox = isFirefox

  const _isSamsung = isSamsung
  const _isKindle = isKindleFire
  const _isApple = isiPad || isiPod || isiPhone || isMac
  const _isZombie = isCurl || isPhantomJS
  const _isPi = isRaspberry
  const _isLinux = isLinux || isLinux64

  const _isMobile = !isTablet && !isDesktop && !isSmartTV
  const geo = {}

  const options = [
    browser,
    version,
    _isAndroid,
    _isChrome,
    _isIE,
    _isSafari,
    _isOpera,
    _isFirefox,
    _isSamsung,
    _isKindle,
    _isApple,
    _isZombie,
    _isPi,
    _isLinux,
    _isMobile,
    os,
    platform,
    source,
    geo
  ]

  res.redirect(301, targetUrl)
}
