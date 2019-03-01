import { localStorage } from '../lib/helpers'
import { JWT_STORAGE_KEY, RWT_STORAGE_KEY } from '../constants/common'

export default class Auth {
  static authenticate(jwt, rwt) {
    localStorage(JWT_STORAGE_KEY, jwt)
    localStorage(RWT_STORAGE_KEY, rwt)
  }

  static deauthenticate() {
    localStorage(JWT_STORAGE_KEY, null)
    localStorage(RWT_STORAGE_KEY, null)
  }

  static getJwt() {
    return localStorage(JWT_STORAGE_KEY)
  }

  static getAuthenticationHeader() {
    if (!Auth.isAuthenticated()) return null

    return `Bearer ${Auth.getJwt()}`
  }
  static isAuthenticated() {
    return Auth.getJwt() !== null
  }

  static fakeAuth() {
    return true
  }
}
