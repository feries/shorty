import axios from 'axios'

import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_ERROR,
  GLOBAL_SET_TOAST,
  GLOBAL_UNSET_TOAST,
  DELETE_URL_START,
  DELETE_URL_SUCCESS,
  DELETE_URL_ERROR
} from '../constants/actions'
import {
  API_V1_ENDPOINT,
  URL_LIST,
  FILTERED_URL_LIST
} from '../constants/endpoint'
import { PER_PAGE } from '../constants/common'

import { objectToQuery } from '../lib/helpers'
import Auth from '../lib/Authentication'

export const startFetchLinks = (limit = PER_PAGE, skip = 0) => async (
  dispatch
) => {
  try {
    dispatch({ type: DASHBOARD_FETCH_START })
    const qp = objectToQuery({ limit, skip })
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const { data, status, statusText } = await axios.get(
      `${API_V1_ENDPOINT}${URL_LIST}${qp}`
    )

    if (status !== 200) {
      dispatch(setGlobalToast(statusText))
      return dispatch(fetchError())
    }

    const _skip = skip === 0 ? 1 : skip
    const hasMore = data.count > limit * _skip
    dispatch(fetchSuccess({ ...data, hasMore }))
  } catch (e) {
    return window.location.assign('/500')
  }
}

export const fetchSuccess = (data) => ({
  type: DASHBOARD_FETCH_SUCCESS,
  data
})

export const fetchError = () => ({
  type: DASHBOARD_FETCH_ERROR
})

export const startSubmitLink = (url) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_LINK_START })
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const { data, status, statusText } = await axios.post(
      `${API_V1_ENDPOINT}${URL_LIST}`,
      { url }
    )

    if (status !== 201) {
      dispatch(setGlobalToast(statusText))
      return dispatch(submitLinkError())
    }

    dispatch(submitLinkSuccess(data))
  } catch (e) {
    if (e.response.status === 400) {
      dispatch(setGlobalToast(e.response.data.message))
      return dispatch(submitLinkError())
    } else {
      window.location.assign('/500')
    }
  }
}

export const submitLinkSuccess = (data) => ({
  type: SUBMIT_LINK_SUCCESS,
  data
})

export const submitLinkError = () => ({
  type: SUBMIT_LINK_ERROR
})

export const startFilter = (key, value) => async (dispatch) => {
  try {
    dispatch({ type: FILTER_START })
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
    const qp = objectToQuery({ key, value })

    const { data } = await axios.get(
      `${API_V1_ENDPOINT}${FILTERED_URL_LIST}${qp}`
    )

    dispatch(startFilterSuccess({ ...data, hasMore: false }))
  } catch (e) {
    if (e.response.status === 400) {
      dispatch(setGlobalToast(e.response.data.message))
      return dispatch(startFilterError())
    } else {
      window.location.assign('/500')
    }
  }
}

export const startFilterSuccess = (data) => ({
  type: FILTER_SUCCESS,
  data
})

export const startFilterError = () => ({
  type: FILTER_ERROR
})

export const startDelete = (externalId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_URL_START })
    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()

    await axios.delete(`${API_V1_ENDPOINT}${URL_LIST}`)
    dispatch(deleteSuccess())
  } catch (e) {
    if (e.response.status === 400) {
      dispatch(setGlobalToast(e.response.data.message))
      return dispatch(deleteError())
    } else {
      window.location.assign('/500')
    }
  }
}

export const deleteSuccess = (data) => ({
  type: DELETE_URL_SUCCESS,
  data
})

export const deleteError = () => ({
  type: DELETE_URL_ERROR
})

export const setGlobalToast = (data) => ({
  type: GLOBAL_SET_TOAST,
  data
})

export const unsetGlobalToast = () => ({
  type: GLOBAL_UNSET_TOAST
})
