import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'
import { API_V1_ENDPOINT, URL_LOGIN } from '../constants/endpoint'

export const loginStart = () => async (dispatch) => {
  dispatch({ type: LOGIN_START })
}

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  error
})
