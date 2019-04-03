import { GET_ME } from '../constants/endpoint'
import {
  GET_ME_START,
  GET_ME_SUCCESS,
  GET_ME_ERROR
} from '../constants/actions'

import { api } from '../lib/helpers'
import { setGlobalToast } from './dashboard'

export const getMe = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ME_START })
    const { user } = await api.get(GET_ME).json()
    dispatch({ type: GET_ME_SUCCESS, data: user.value })
  } catch (exception) {
    const { message } = await exception.response.json()
    dispatch(setGlobalToast({ type: 'error', message }))
    dispatch({ type: GET_ME_ERROR })
  }
}
