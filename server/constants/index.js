// Name of the authorization header key to get
// for validate api requests
exports.authHeaderKey = 'x-auth-key'

// Default value for limit paginated query
exports.queryLimit = 10

// Map of allowed url filter keys
const keys = new Map()
keys.set('targetUrl', 'target_url')
keys.set('sourceUrl', 'source_url')

exports.queryKeys = keys

// Allowed time range for query into detail page
const RANGE_ALL = 'all'
const RANGE_MONTH = 'month'
const RANGE_WEEK = 'week'
const RANGE_DAY = 'day'

const TIME_RANGE = new Set()
TIME_RANGE.add(RANGE_ALL)
TIME_RANGE.add(RANGE_MONTH)
TIME_RANGE.add(RANGE_WEEK)
TIME_RANGE.add(RANGE_DAY)

exports.RANGE_ALL = RANGE_ALL
exports.RANGE_MONTH = RANGE_MONTH
exports.RANGE_WEEK = RANGE_WEEK
exports.RANGE_DAY = RANGE_DAY
exports.queryRange = TIME_RANGE
