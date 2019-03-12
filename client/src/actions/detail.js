import axios from 'axios'

import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'
import { API_V1_ENDPOINT, URL_DETAIL } from '../constants/endpoint'
import { setGlobalToast } from './dashboard'

export const startFetchData = (externalId, hasRange, range) => async (
  dispatch
) => {
  dispatch({ type: DETAIL_FETCH_START })

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
}

export const fetchSuccess = (data) => ({
  type: DETAIL_FETCH_SUCCESS,
  data
})

export const fetchError = (error) => ({
  type: DETAIL_FETCH_ERROR,
  error
})
