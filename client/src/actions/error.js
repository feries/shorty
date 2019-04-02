import { ERROR_PAGE_CUSTOM } from '../constants/endpoint'
import {
  CUSTOM_MARKUP_START,
  CUSTOM_MARKUP_SUCCESS,
  CUSTOM_MARKUP_ERROR
} from '../constants/actions'

import { api } from '../lib/helpers'

export const fetchCustomErrorMarkup = (what) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOM_MARKUP_START })
    const endpoint = ERROR_PAGE_CUSTOM.replace('{what}', what)
    const data = await api.get(endpoint).json()
    dispatch({ type: CUSTOM_MARKUP_SUCCESS, data })
  } catch (exception) {
    dispatch({ type: CUSTOM_MARKUP_ERROR })
  }
}
