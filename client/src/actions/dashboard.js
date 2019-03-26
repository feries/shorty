import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR,
  SUBMIT_LINK_ERROR_HOST,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_ERROR,
  GLOBAL_SET_TOAST,
  GLOBAL_UNSET_TOAST,
  DELETE_URL_START,
  DELETE_URL_SUCCESS,
  DELETE_URL_ERROR,
  SHORT_LINK_CLICK,
  ADD_HOST_START,
  ADD_HOST_SUCCESS,
  ADD_HOST_ERROR,
  SHORT_LINK_COPY
} from '../constants/actions'
import { URL_LIST, HOSTS, FILTERED_URL_LIST } from '../constants/endpoint'
import { PER_PAGE } from '../constants/common'
import { api } from '../lib/helpers'
import { refreshToken } from './token'

export const startFetchLinks = (
  limit = PER_PAGE,
  skip = 0,
  clearResults = false
) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_FETCH_START })

    const data = await api
      .get(URL_LIST, { searchParams: { limit, skip } })
      .json()
    const _skip = skip === 0 ? 1 : skip
    const hasMore = data.count > limit * _skip
    dispatch(fetchSuccess({ ...data, hasMore, clearResults }))
  } catch (exception) {
    if (exception.response.status === 401) {
      return refreshToken(dispatch, startFetchLinks, limit, skip, clearResults)
    }
    dispatch(fetchError())

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

export const startSubmitLink = (url, short) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_LINK_START })
    const json = { url, short }
    const response = await api.post(URL_LIST, { json })
    const data = response.json()

    if (response.status === 200) {
      dispatch(invalidHost({ url, short }))
      return dispatch(submitLinkError())
    }

    if (response.status !== 201) {
      dispatch(setGlobalToast({ message: 'Something went wrong.' }))
      return dispatch(submitLinkError())
    }

    return dispatch(submitLinkSuccess(data))
  } catch (exception) {
    if (exception.response.status === 400) {
      dispatch(
        setGlobalToast({ type: 'error', message: exception.response.message })
      )
      return dispatch(submitLinkError())
    } else if (exception.response.status === 401) {
      return refreshToken(dispatch, startSubmitLink, url, short)
    }
    window.location.assign('/500')
  }
}

export const invalidHost = (data) => ({
  type: SUBMIT_LINK_ERROR_HOST,
  data
})

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
    const data = await api
      .get(FILTERED_URL_LIST, {
        searchParams: { key, value }
      })
      .json()

    dispatch(startFilterSuccess({ ...data, hasMore: false }))
  } catch (exception) {
    if (exception.response.status === 400) {
      dispatch(setGlobalToast(exception.response.message))
      return dispatch(startFilterError())
    } else if (exception.response.status === 401) {
      return refreshToken(dispatch, startFilter, key, value)
    }

    window.location.assign('/500')
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
    await api.delete(`${URL_LIST}/${externalId}`)
    dispatch(
      setGlobalToast({ type: 'success', message: 'URL successfully deleted!' })
    )
    dispatch(deleteSuccess(externalId))
  } catch (exception) {
    if (exception.response.status === 400) {
      dispatch(
        setGlobalToast({ type: 'error', message: exception.response.message })
      )
      return dispatch(deleteError())
    } else if (exception.response.status === 401) {
      return refreshToken(dispatch, startDelete, externalId)
    }

    window.location.assign('/500')
  }
}

export const deleteSuccess = (data) => ({
  type: DELETE_URL_SUCCESS,
  data
})

export const deleteError = () => ({
  type: DELETE_URL_ERROR
})

export const startAddHost = (shortUrl, fullUrl) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_HOST_START })
    const json = { shortUrl, fullUrl }
    await api.post(HOSTS, { json }).json()

    dispatch(
      setGlobalToast({
        type: 'success',
        message: `New Host (${fullUrl} as ${shortUrl}) successfully added!`
      })
    )

    const state = getState()
    dispatch(
      startSubmitLink(
        state.dashboard.host.targetUrl,
        state.dashboard.host.short
      )
    )
    return dispatch(addHostSuccess())
  } catch (exception) {
    if (exception.response.status === 400) {
      dispatch(
        setGlobalToast({ type: 'error', message: exception.response.message })
      )
      return dispatch(addHostError())
    } else if (exception.response.status === 401) {
      return refreshToken(dispatch, startAddHost, shortUrl, fullUrl)
    }
    window.location.assign('/500')
  }
}

export const addHostSuccess = (data) => ({
  type: ADD_HOST_SUCCESS,
  data
})

export const addHostError = () => ({
  type: ADD_HOST_ERROR
})

export const shortLinkClick = (data) => ({
  type: SHORT_LINK_CLICK,
  data
})

export const shortLinkCopy = () => ({
  type: SHORT_LINK_COPY,
  data: { type: 'info', message: 'Copied to clipboard' }
})

export const setGlobalToast = (data) => ({
  type: GLOBAL_SET_TOAST,
  data
})

export const unsetGlobalToast = () => ({
  type: GLOBAL_UNSET_TOAST
})
