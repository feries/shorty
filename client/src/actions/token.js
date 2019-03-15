import axios from 'axios'

import Auth from '../lib/Authentication'
import { API_V1_ENDPOINT, REFRESH_TOKEN } from '../constants/endpoint'

import {
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR
} from '../constants/actions'

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
    const {
      data: { token, refreshToken },
      status
    } = await axios.post(`${API_V1_ENDPOINT}${REFRESH_TOKEN}`, {
      rwt: Auth.getRwt()
    })

    if (status !== 201) return new Error('Refresh token fail.')

    dispatch(refreshTokenSuccess())
    Auth.authenticate(token, refreshToken)
    callback && callback(...params)
  } catch (error) {
    dispatch(refreshTokenFail())
    Auth.deauthenticate()
    window.location.assign('/login')
  }
}

export const refreshTokenFail = () => ({
  type: REFRESH_TOKEN_ERROR
})

export const refreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS
})
