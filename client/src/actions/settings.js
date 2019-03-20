import ky from 'ky'

import Auth from '../lib/Authentication'
import {
  API_V1_ENDPOINT,
  SETTINGS_USER_INFO,
  SETTINGS_API_KEYS
} from '../constants/endpoint'

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

const api = ky.extend({
  prefixUrl: API_V1_ENDPOINT,
  hooks: {
    beforeRequest: [
      (options) =>
        (options.headers.authorization = Auth.getAuthenticationHeader())
    ]
  }
})

export const startFetchUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_START })

    const { data, status } = await api.get(SETTINGS_USER_INFO)

    if (status !== 200) return new Error('Failed to fetch user data.')

    dispatch(userInfoSuccess(data))
  } catch (error) {
    if (error.status === 401) {
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

    const { data, status } = await api.get(SETTINGS_API_KEYS)

    if (status !== 200) return new Error('Failed to fetch Api Keys.')

    dispatch(apiKeysFetchSuccess(data))
  } catch (error) {
    if (error.status === 401) {
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

    const { data, status } = await api.delete(
      `${SETTINGS_API_KEYS}/${externalId}`
    )

    if (status !== 200) throw new Error('Failed to deactivate Api Keys.')

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
    dispatch(
      setGlobalToast({ type: 'error', message: error.response.data.message })
    )
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
