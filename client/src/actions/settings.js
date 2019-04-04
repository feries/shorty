import {
  SETTINGS_USER_INFO,
  SETTINGS_API_KEYS,
  SETTINGS_CUSTOM_ERROR_PAGE,
  SETTINGS_USERS
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
  ADD_API_KEY_START,
  ADD_API_KEY_SUCCESS,
  ADD_API_KEY_ERROR,
  CUSTOM_MD_FETCH_START,
  CUSTOM_MD_FETCH_SUCCESS,
  CUSTOM_MD_FETCH_ERROR,
  CUSTOM_MD_SAVE_START,
  CUSTOM_MD_SAVE_ERROR,
  CUSTOM_MD_SAVE_SUCCESS,
  USERS_FETCH_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_ERROR,
  USERS_DEACTIVATE_START,
  USERS_DEACTIVATE_SUCCESS,
  USERS_DEACTIVATE_ERROR,
  USERS_ADD_ERROR,
  USERS_ADD_SUCCESS,
  USERS_ADD_START
} from '../constants/actions'

import { setGlobalToast } from './dashboard'
import { api } from '../lib/helpers'
import { USER_PER_PAGE } from '../constants/common'
import { isUrl } from '../lib/validators'

export const startFetchUserInfo = () => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_START })
    const data = await api.get(SETTINGS_USER_INFO).json()
    dispatch(userInfoSuccess(data))
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(userInfoError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
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
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(apiKeysFetchError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
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
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(deactivateKeyError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
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
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(fetchCustomMdError({ data: { page } }))
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
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
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(saveCustomMdError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
  }
}

export const saveCustomMdError = () => ({
  type: CUSTOM_MD_SAVE_ERROR
})

export const saveCustomMdSuccess = (md, page) => ({
  type: CUSTOM_MD_SAVE_SUCCESS,
  data: { md, page }
})

export const startFetchUsers = (limit = USER_PER_PAGE, skip = 0) => async (
  dispatch
) => {
  try {
    dispatch({ type: USERS_FETCH_START })

    const data = await api
      .get(SETTINGS_USERS, { searchParams: { limit, skip } })
      .json()

    dispatch(fetchUsersSuccess(data))
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(fetchUserError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
  }
}

export const fetchUserError = () => ({
  type: USERS_FETCH_ERROR
})

export const fetchUsersSuccess = (data) => ({
  type: USERS_FETCH_SUCCESS,
  data
})

export const startDeactivateUser = (externalId) => async (dispatch) => {
  try {
    dispatch({ type: USERS_DEACTIVATE_START })

    await api.delete(`${SETTINGS_USERS}/${externalId}`)

    dispatch(
      setGlobalToast({
        type: 'success',
        message: 'User successfully deactivated.'
      })
    )
    dispatch(deactivateUsersSuccess(externalId))
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(deactivateUserError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
  }
}

export const deactivateUserError = () => ({
  type: USERS_DEACTIVATE_ERROR
})

export const deactivateUsersSuccess = (data) => ({
  type: USERS_DEACTIVATE_SUCCESS,
  data
})

export const startAddNewUser = (name, surname, email) => async (dispatch) => {
  try {
    dispatch({ type: USERS_ADD_START })
    const json = { name, surname, email }
    await api.post(SETTINGS_USERS, { json }).json()

    dispatch(
      setGlobalToast({
        type: 'success',
        message: 'User successfully added.'
      })
    )
    dispatch(addNewUserSuccess(json))
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(addNewUserError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
  }
}

export const addNewUserError = () => ({
  type: USERS_ADD_ERROR
})

export const addNewUserSuccess = (data) => ({
  type: USERS_ADD_SUCCESS,
  data
})

export const startAddNewApiKey = (issuer) => async (dispatch) => {
  try {
    dispatch({ type: ADD_API_KEY_START })

    if (!isUrl(issuer)) {
      dispatch(
        setGlobalToast({
          type: 'error',
          message: 'Issuer must be a valid HTTP address.'
        })
      )
      return dispatch(addNewApiError())
    }

    const json = { issuer }
    const data = await api.post(SETTINGS_API_KEYS, { json }).json()
    dispatch(
      setGlobalToast({
        type: 'success',
        message: 'API-KEY successfully added.'
      })
    )
    dispatch(addNewApiSuccess(data))
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch(addNewApiError())
    } catch (e) {
      const { status } = await e.response

      if (status !== 401) return window.location.assign('/500')
    }
  }
}

const addNewApiError = () => ({
  type: ADD_API_KEY_ERROR
})

const addNewApiSuccess = (data) => ({
  type: ADD_API_KEY_SUCCESS,
  data
})
