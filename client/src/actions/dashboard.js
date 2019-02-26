import axios from 'axios'

import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR
} from '../constants/actions'
import { API_V1_ENDPOINT, URL_LIST } from '../constants/endpoint'
import { PER_PAGE } from '../constants/common'

import { objectToQuery } from '../lib/helpers'
import Auth from '../lib/Authentication'

axios.defaults.headers.common['Authorization'] = Auth.getAuthenticationHeader()

export const startFetchLinks = (limit = PER_PAGE, skip = 0) => async (
  dispatch
) => {
  dispatch({ type: DASHBOARD_FETCH_START })
  const qp = objectToQuery({ limit, skip })
  const response = await axios.get(`${API_V1_ENDPOINT}${URL_LIST}${qp}`)

  console.log('response', response)
}
