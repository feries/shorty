// Limits
export const SHORT_URL_LENGTH = 15

// Query option
export const PER_PAGE = 10
export const USER_PER_PAGE = 6

// Security
export const JWT_STORAGE_KEY = '__tkn'
export const RWT_STORAGE_KEY = '__rkn'
export const JWT_EXPIRE_KEY = '__tknExpire'

// Page Actions
export const QR_CODE = 'QR_CODE'
export const TRASH = 'TRASH'
export const COPY = 'COPY'

// Utils
export const nope = () => {}

// Responsive
export const mobileBreakPoint = 768

// Helpers
export const RANGE_ALL = 'all'
export const RANGE_MONTH = 'month'
export const RANGE_WEEK = 'week'
export const RANGE_DAY = 'day'
export const TIME_RANGE = new Map()
TIME_RANGE.set(0, RANGE_ALL)
TIME_RANGE.set(1, RANGE_MONTH)
TIME_RANGE.set(2, RANGE_WEEK)
TIME_RANGE.set(3, RANGE_DAY)
