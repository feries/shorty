import {
  VALIDATE_HASH,
  ACTIVATE_ACCOUNT,
  SET_PASSWORD
} from '../constants/endpoint'

import {
  VALIDATE_HASH_START,
  VALIDATE_HASH_SUCCESS,
  VALIDATE_HASH_ERROR,
  ACTIVATE_ACCOUNT_START,
  ACTIVATE_ACCOUNT_SUCCESS,
  ACTIVATE_ACCOUNT_ERROR,
  SET_PASSWORD_START,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR
} from '../constants/actions'

import { setGlobalToast } from './dashboard'
import { api } from '../lib/helpers'
import { refreshToken } from './token'
import Auth from '../lib/Authentication'

export const validateActivationHashStart = (hash) => async (dispatch) => {
  try {
    if (!hash) return window.location.assign('/500')

    dispatch({ type: VALIDATE_HASH_START })
    const endpoint = VALIDATE_HASH.replace('{hash}', hash)
    const data = await api.get(endpoint).json()

    if (!data) return window.location.assign('/500')

    dispatch({ type: VALIDATE_HASH_SUCCESS })
  } catch (error) {
    dispatch({ type: VALIDATE_HASH_ERROR })
    return window.location.assign('/500')
  }
}

export const activateAccountStart = (
  reset,
  hash,
  email,
  oldPassword,
  newPassword,
  confirmPassword
) => async (dispatch) => {
  try {
    dispatch({ type: ACTIVATE_ACCOUNT_START })
    const json = { reset, email, newPassword, confirmPassword }
    const endpoint = ACTIVATE_ACCOUNT.replace('{hash}', hash)
    const { token, refreshToken } = await api.post(endpoint, { json }).json()
    Auth.authenticate(token, refreshToken)
    dispatch({ type: ACTIVATE_ACCOUNT_SUCCESS })
    window.location.assign('/')
  } catch (exception) {
    dispatch(setGlobalToast({ type: 'error', message: exception.message }))
    dispatch({ type: ACTIVATE_ACCOUNT_ERROR })
  }
}

export const setNewPasswordStart = (
  oldPassword,
  newPassword,
  confirmPassword
) => async (dispatch) => {
  try {
    dispatch({ type: SET_PASSWORD_START })
    const json = { oldPassword, newPassword, confirmPassword }
    const { message } = await api.post(SET_PASSWORD, { json }).json()
    dispatch({ type: SET_PASSWORD_SUCCESS })
    dispatch(
      setGlobalToast({
        type: 'success',
        message
      })
    )
  } catch (exception) {
    if (exception.response.status === 401) {
      return refreshToken(
        dispatch,
        setNewPasswordStart,
        oldPassword,
        newPassword,
        confirmPassword
      )
    }
    dispatch(setGlobalToast({ type: 'error', message: exception.message }))
    dispatch({ type: SET_PASSWORD_ERROR })
  }
}
