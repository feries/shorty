import axios from 'axios'

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

export const startFetchUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_START })
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const { data, status } = await axios.get(
      `${API_V1_ENDPOINT}${SETTINGS_USER_INFO}`
    )

    if (status !== 200) return new Error('Failed to fetch user data.')

    dispatch(userInfoSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startFetchUserInfo)
    }
    dispatch(
      setGlobalToast({ type: 'error', message: error.response.data.message })
    )
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
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const { data, status } = await axios.get(
      `${API_V1_ENDPOINT}${SETTINGS_API_KEYS}`
    )

    if (status !== 200) return new Error('Failed to fetch Api Keys.')

    dispatch(apiKeysFetchSuccess(data))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startFetchUserInfo)
    }
    dispatch(
      setGlobalToast({ type: 'error', message: error.response.data.message })
    )
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
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const { data, status } = await axios.delete(
      `${API_V1_ENDPOINT}${SETTINGS_API_KEYS}/${externalId}`
    )

    if (status !== 200) return new Error('Failed to fetch Api Keys.')

    dispatch(deactivateKeySuccess(data))
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
