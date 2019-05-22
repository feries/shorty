import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'
import { URL_DETAIL } from '../constants/endpoint'
import { setGlobalToast } from './dashboard'
import { api, exceptionHandler } from '../lib/helpers'

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

    const data = await api.get(formatted).json()
    dispatch({ type: DETAIL_FETCH_SUCCESS, data })
  } catch (exception) {
    try {
      const { message } = await exception.response.json()
      dispatch(setGlobalToast({ type: 'error', message }))
      dispatch({ type: DETAIL_FETCH_ERROR })
    } catch (e) {
      await exceptionHandler()
    }
  }
}
