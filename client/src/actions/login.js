import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'
import { URL_LOGIN } from '../constants/endpoint'

import { api } from '../lib/helpers'
import Auth from '../lib/Authentication'
import { setGlobalToast } from './dashboard'

export const loginStart = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START })
    const json = { email, password }
    const { token, refreshToken, expiresIn } = await api
      .post(URL_LOGIN, { json, secure: false })
      .json()
    Auth.authenticate(token, refreshToken, expiresIn)
    dispatch({ type: LOGIN_SUCCESS })
    window.location.assign('/')
  } catch (exception) {
    const { message } = await exception.response.json()
    dispatch(setGlobalToast({ type: 'error', message }))
    dispatch({ type: LOGIN_ERROR })
  }
}
