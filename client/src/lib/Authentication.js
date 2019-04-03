import dayjs from 'dayjs'

import { api, localStorage } from '../lib/helpers'
import {
  JWT_STORAGE_KEY,
  RWT_STORAGE_KEY,
  JWT_EXPIRE_KEY
} from '../constants/common'
import { REFRESH_TOKEN } from '../constants/endpoint'

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

    const refreshThreshold = dayjs().add(1, 'minute')

    return refreshThreshold > expireIn
  }

  static getAuthenticationHeader() {
    if (!Auth.isAuthenticated()) return null

    return `Bearer ${Auth.getJwt()}`
  }

  static isAuthenticated() {
    return Auth.getJwt() !== null
  }

  static async refreshToken() {
    try {
      const json = { rwt: Auth.getRwt() }
      const { token, refreshToken } = await api
        .post(REFRESH_TOKEN, { json })
        .json()

      Auth.authenticate(token, refreshToken)
    } catch (exception) {
      Auth.deauthenticate()
    }
  }
}
