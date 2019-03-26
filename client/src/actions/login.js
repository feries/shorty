import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'
import { URL_LOGIN } from '../constants/endpoint'

import { api } from '../lib/helpers'
import Auth from '../lib/Authentication'
import { setGlobalToast } from './dashboard'

export const loginStart = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START })
    const json = { email, password }
    const { token, refreshToken } = await api.post(URL_LOGIN, { json }).json()
    Auth.authenticate(token, refreshToken)
    dispatch({ type: LOGIN_SUCCESS })
    window.location.assign('/')
  } catch (exception) {
    dispatch(setGlobalToast({ type: 'error', message: 'Invalid credentials' }))
    dispatch({ type: LOGIN_ERROR })
  }
}
