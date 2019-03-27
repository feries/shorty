import { REFRESH_TOKEN } from '../constants/endpoint'
import {
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR
} from '../constants/actions'

import { api } from '../lib/helpers'
import Auth from '../lib/Authentication'

/**
 * @name refreshToken
 * @description Action for refresh user JWT
 * @param {Function} dispatch - Redux dispatcher
 * @param {Function} callback - Callee function to be called again once new JWT is fetched
 * @param {String | Number | Boolean | undefined } params - Parameters for callback function
 * @return {Function}
 */
export const refreshToken = async (dispatch, callback, ...params) => {
  try {
    dispatch({ type: REFRESH_TOKEN_START })
    const json = { rwt: Auth.getRwt() }
    const { token, refreshToken } = await api
      .post(REFRESH_TOKEN, { json })
      .json()
    dispatch({ type: REFRESH_TOKEN_SUCCESS })
    Auth.authenticate(token, refreshToken)
    callback && callback(...params)
  } catch (exception) {
    dispatch({ type: REFRESH_TOKEN_ERROR })
    Auth.deauthenticate()
    window.location.assign('/login')
  }
}
