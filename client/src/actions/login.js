import axios from 'axios'

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'
import { API_V1_ENDPOINT, URL_LOGIN } from '../constants/endpoint'

import Auth from '../lib/Authentication'

export const loginStart = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_START })
  const { data, status, statusText } = await axios.post(
    `${API_V1_ENDPOINT}${URL_LOGIN}`,
    { email, password }
  )

  if (status === 401) {
    Auth.deauthenticate()
    window.location.assign('/')
  }

  if (status !== 200) return dispatch(loginError(statusText))

  const { token, refreshToken } = data
  Auth.authenticate(token, refreshToken)
  dispatch(loginSuccess(data))
  window.location.assign('/')
}

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error
})
