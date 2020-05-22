// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
import ky from 'ky'
import { API_V1_ENDPOINT } from '../constants/endpoint'
import Auth from './Authentication'

export const debounce = (func, wait, immediate) => {
  let timeout

  return function () {
    const context = this
    const args = arguments
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export const objectToQuery = (object) =>
  Object.keys(object)
    .reduce(
      (result, key) =>
        object[key] !== null && object[key] !== undefined
          ? (result += `${key}=${object[key]}&`)
          : result,
      '?'
    )
    .slice(0, -1)

/**
 * @name sessionStorage
 * @description Simple SessionStorage wrapper with READ/SAVE/REMOVE
 *              READ:   sessionStorage('<NAME>')
 *              REMOVE: sessionStorage('<NAME>', null)
 *              SAVE:   sessionStorage('<NAME>', '<VALUE>')
 * @param {String} key
 * @param {String} value
 */
export const sessionStorage = (key, value = undefined) =>
  value !== undefined
    ? value !== null
      ? window.sessionStorage.setItem(key, value)
      : window.sessionStorage.removeItem(key)
    : window.sessionStorage.getItem(key)

/**
 * @name localStorage
 * @description Simple LocalStorage wrapper with READ/SAVE/REMOVE
 *              READ:   localStorage('<NAME>')
 *              REMOVE: localStorage('<NAME>', null)
 *              SAVE:   localStorage('<NAME>', '<VALUE>')
 * @param {String} key
 * @param {String} value
 */
export const localStorage = (key, value = undefined) =>
  value !== undefined
    ? value !== null
      ? window.localStorage.setItem(key, value)
      : window.localStorage.removeItem(key)
    : window.localStorage.getItem(key)

/**
 * @name clearUrl
 * @description Remove http(s):// from given url
 * @param {String} url - Url to clear
 * @returns {string|*}
 */
export const clearUrl = (url) => {
  if (url.indexOf('://') !== -1) return url.substr(url.indexOf('://') + 3)
  return url
}

/**
 * @name removeInitialSlash
 * @description Remove initial slash from path
 * @param {String} path - Path to check
 * @return {String}
 */
export const removeInitialSlash = (path) =>
  path.indexOf('/') === 0 ? path.substr(1) : path

/**
 *
 * @type {Ky}
 */
export const api = ky.extend({
  prefixUrl: API_V1_ENDPOINT,
  hooks: {
    beforeRequest: [
      async (options) => {
        const isSecure = options.secure || true
        if (isSecure && !Auth.isRefreshPending() && Auth.isExpired()) {
          await Auth.refreshToken()
        }

        options.headers.append('Authorization', Auth.getAuthenticationHeader())
      },
    ],
  },
})

export const exceptionHandler = async (exception) => {
  try {
    const { status } = await exception.response
    if (status === 401) {
      await Auth.startRefreshToken()
    } else return window.location.assign('/500')
  } catch (error) {
    Auth.deauthenticate()
    window.location.assign('/')
  }
}
