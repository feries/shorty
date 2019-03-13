import axios from 'axios'

import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'
import { API_V1_ENDPOINT, URL_DETAIL } from '../constants/endpoint'
import { setGlobalToast } from './dashboard'

import Auth from '../lib/Authentication'

export const startFetchData = (externalId, hasRange, range) => async (
  dispatch
) => {
  try {
    dispatch({ type: DETAIL_FETCH_START })

    axios.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()

    const rangeFormatter = hasRange && range ? `/${range}` : ''
    const formatted = URL_DETAIL.replace('{id}', externalId).replace(
      '/{range}',
      rangeFormatter
    )

    const { data, status, statusText } = await axios.get(
      `${API_V1_ENDPOINT}${formatted}`
    )

    if (status !== 200) {
      dispatch(setGlobalToast(statusText))
      return dispatch(fetchError())
    }

    dispatch(fetchSuccess(data))
  } catch (e) {
    return window.location.assign('/500')
  }
}

export const fetchSuccess = (data) => ({
  type: DETAIL_FETCH_SUCCESS,
  data
})

export const fetchError = (error) => ({
  type: DETAIL_FETCH_ERROR,
  error
})
