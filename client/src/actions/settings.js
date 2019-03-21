import { SETTINGS_USER_INFO, SETTINGS_API_KEYS } from '../constants/endpoint'

import {
  USER_INFO_START,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR,
  API_KEY_START,
  API_KEY_ERROR,
  API_KEY_SUCCESS,
  REMOVE_API_KEY_START,
  REMOVE_API_KEY_SUCCESS,
  REMOVE_API_KEY_ERROR
} from '../constants/actions'

import { setGlobalToast } from './dashboard'
import { refreshToken } from './token'

import { api } from '../lib/helpers'

export const startFetchUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_START })
    const data = await api.get(SETTINGS_USER_INFO).json()
    dispatch(userInfoSuccess(data))
  } catch (error) {
    console.log('ERROR', error, error.response.status)
    if (error.response.status === 401) {
      return refreshToken(dispatch, startFetchUserInfo)
    }
    dispatch(setGlobalToast({ type: 'error', message: error.message }))
    dispatch(userInfoError())
  }
}

export const userInfoError = () => ({
  type: USER_INFO_ERROR
})

export const userInfoSuccess = (data) => ({
  type: USER_INFO_SUCCESS,
  data
})

export const startFetchApiKeys = () => async (dispatch) => {
  try {
    dispatch({ type: API_KEY_START })
    const data = await api.get(SETTINGS_API_KEYS).json()
    dispatch(apiKeysFetchSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startFetchUserInfo)
    }
    dispatch(setGlobalToast({ type: 'error', message: error.message }))
    dispatch(apiKeysFetchError())
  }
}

export const apiKeysFetchError = () => ({
  type: API_KEY_ERROR
})

export const apiKeysFetchSuccess = (data) => ({
  type: API_KEY_SUCCESS,
  data
})

export const startDeactivateKey = (externalId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_API_KEY_START })

    await api.delete(`${SETTINGS_API_KEYS}/${externalId}`)

    dispatch(
      setGlobalToast({
        type: 'success',
        message: 'API-Key successfully deactivated'
      })
    )
    dispatch(deactivateKeySuccess({ data: externalId }))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startDeactivateKey, externalId)
    }
    dispatch(setGlobalToast({ type: 'error', message: error.message }))
    dispatch(deactivateKeyError())
  }
}

export const deactivateKeyError = () => ({
  type: REMOVE_API_KEY_ERROR
})

export const deactivateKeySuccess = (data) => ({
  type: REMOVE_API_KEY_SUCCESS,
  data
})
