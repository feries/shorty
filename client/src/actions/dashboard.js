import axios from 'axios'

import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR
} from '../constants/actions'
import { API_V1_ENDPOINT, URL_LIST } from '../constants/endpoint'
import { PER_PAGE } from '../constants/common'

import { objectToQuery } from '../lib/helpers'
import Auth from '../lib/Authentication'

export const startFetchLinks = (limit = PER_PAGE, skip = 0) => async (
  dispatch
) => {
  try {
    dispatch({ type: DASHBOARD_FETCH_START })
    const qp = objectToQuery({ limit, skip })
    axios.defaults.headers.common['Authorization'] = Auth.getAuthenticationHeader()
    const {data, status, statusText} = await axios.get(`${API_V1_ENDPOINT}${URL_LIST}${qp}`)

    if (status !== 200)
      return  dispatch(fetchError(statusText))

    dispatch(fetchSuccess(data))
  } catch (e) {
    return window.location.assign('/500')
  }
}


export const fetchSuccess = (data) => ({
  type: DASHBOARD_FETCH_SUCCESS,
  data
})

export const fetchError = (error) => ({
  type: DASHBOARD_FETCH_ERROR,
  error
})

export const startSubmitLink = url => async dispatch => {
  try {
    dispatch({ type: SUBMIT_LINK_START })
    axios.defaults.headers.common['Authorization'] = Auth.getAuthenticationHeader()
    const {data, status, statusText} = await axios.post(`${API_V1_ENDPOINT}${URL_LIST}`, { url })

    if (status !== 201)
      return dispatch(submitLinkError(statusText))

    dispatch(submitLinkSuccess(data))
  } catch (e) {
    if (e.response.status === 400) {
      return dispatch(submitLinkError(e.response.data.message))
    } else {
      window.location.assign('/500')
    }
  }
}

export const submitLinkSuccess = data => ({
  type: SUBMIT_LINK_SUCCESS,
  data
})

export const submitLinkError = error => ({
  type: SUBMIT_LINK_ERROR,
  error
})

