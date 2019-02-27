// Name of the authorization header key to get
// for validate api requests
exports.authHeaderKey = 'x-auth-key';

// Default value for limit paginated query
exports.queryLimit = 10;

// Map of allowed url filter keys
const keys = new Map()
keys.set('targetUrl', 'target_url')
keys.set('sourceUrl', 'source_url')

exports.queryKeys = keys
