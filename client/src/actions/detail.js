import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'
import { URL_DETAIL } from '../constants/endpoint'
import { setGlobalToast } from './dashboard'
import { refreshToken } from './token'
import { api } from '../lib/helpers'

export const startFetchData = (externalId, hasRange, range) => async (
  dispatch
) => {
  try {
    dispatch({ type: DETAIL_FETCH_START })

    const rangeFormatter = hasRange && range ? `/${range}` : ''
    const formatted = URL_DETAIL.replace('{id}', externalId).replace(
      '/{range}',
      rangeFormatter
    )

    const response = await api.get(formatted)
    const data = response.json()

    if (response.status !== 200) {
      dispatch(setGlobalToast('Something went wrong'))
      return dispatch(fetchError())
    }

    dispatch(fetchSuccess(data))
  } catch (exception) {
    if (exception.response.status === 401) {
      return refreshToken(dispatch, startFetchData, externalId, hasRange, range)
    }

    window.location.assign('/500')
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
