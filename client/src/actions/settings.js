import {
  SETTINGS_USER_INFO,
  SETTINGS_API_KEYS,
  SETTINGS_CUSTOM_ERROR_PAGE
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
  REMOVE_API_KEY_ERROR,
  CUSTOM_MD_FETCH_START,
  CUSTOM_MD_FETCH_SUCCESS,
  CUSTOM_MD_FETCH_ERROR,
  CUSTOM_MD_SAVE_START,
  CUSTOM_MD_SAVE_ERROR,
  CUSTOM_MD_SAVE_SUCCESS
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
      return refreshToken(dispatch, startFetchApiKeys)
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

export const startFetchCustomMds = (page) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOM_MD_FETCH_START })
    const content = await api
      .get(`${SETTINGS_CUSTOM_ERROR_PAGE}/${page}`)
      .json()
    dispatch(fetchCustomMdSuccess({ content, page }))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startFetchCustomMds, page)
    }
    dispatch(setGlobalToast({ type: 'error', message: error.message }))
    dispatch(fetchCustomMdError({ data: { page } }))
  }
}

export const fetchCustomMdError = (data) => ({
  type: CUSTOM_MD_FETCH_ERROR,
  data
})

export const fetchCustomMdSuccess = (data) => ({
  type: CUSTOM_MD_FETCH_SUCCESS,
  data
})

export const startSaveCustomMd = (md, page) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOM_MD_SAVE_START })
    const data = await api
      .post(SETTINGS_CUSTOM_ERROR_PAGE, { json: { md, page } })
      .json()

    if (!data.success) return new Error('Error while saving custom template')

    dispatch(
      setGlobalToast({
        type: 'success',
        message: `Custom markup for page ${page} has updated.`
      })
    )

    dispatch(saveCustomMdSuccess(md, page))
  } catch (error) {
    if (error.response.status === 401) {
      return refreshToken(dispatch, startSaveCustomMd, md, page)
    }
    dispatch(setGlobalToast({ type: 'error', message: error.message }))
    dispatch(saveCustomMdError())
  }
}

export const saveCustomMdError = () => ({
  type: CUSTOM_MD_SAVE_ERROR
})

export const saveCustomMdSuccess = (md, page) => ({
  type: CUSTOM_MD_SAVE_SUCCESS,
  data: { md, page }
})
