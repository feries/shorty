import dayjs from 'dayjs'

import { api, localStorage } from '../lib/helpers'
import {
  JWT_STORAGE_KEY,
  RWT_STORAGE_KEY,
  JWT_EXPIRE_KEY,
  JWT_REFRESH,
} from '../constants/common'
import { REFRESH_TOKEN, URL_LOGIN } from '../constants/endpoint'

export default class Auth {
  static authenticate(jwt, rwt, jwtExpire) {
    localStorage(JWT_STORAGE_KEY, jwt)
    localStorage(RWT_STORAGE_KEY, rwt)
    localStorage(JWT_EXPIRE_KEY, jwtExpire)
  }

  static deauthenticate() {
    localStorage(JWT_STORAGE_KEY, null)
    localStorage(RWT_STORAGE_KEY, null)
    localStorage(JWT_EXPIRE_KEY, null)
  }

  static getJwt() {
    return localStorage(JWT_STORAGE_KEY)
  }

  static getRwt() {
    return localStorage(RWT_STORAGE_KEY)
  }

  static isExpired() {
    const expireIn = localStorage(JWT_EXPIRE_KEY)
    if (!expireIn) return null

    const refreshThreshold = dayjs().add(5, 'minute')

    return refreshThreshold.isAfter(dayjs(expireIn))
  }

  static getAuthenticationHeader() {
    if (!Auth.isAuthenticated()) return null

    return `Bearer ${Auth.getJwt()}`
  }

  static isAuthenticated() {
    return Auth.getJwt() !== null
  }

  static isRefreshPending() {
    return localStorage(JWT_REFRESH) !== null
  }

  static startRefreshToken() {
    if (!Auth.isRefreshPending()) return Auth.refreshToken()
  }

  static async refreshToken() {
    try {
      const json = { rwt: Auth.getRwt() }
      const { token, refreshToken, expiresIn } = await api
        .post(REFRESH_TOKEN, { json })
        .json()

      if (!token || !refreshToken) {
        Auth.deauthenticate()
        window.location.assign(URL_LOGIN)
        return
      }

      Auth.authenticate(token, refreshToken, expiresIn)
    } catch (exception) {
      Auth.deauthenticate()
      window.location.assign('/500')
    }
  }
}
