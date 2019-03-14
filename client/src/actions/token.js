import Auth from '../lib/Authentication'

import {
  REFRESH_TOKEN_START,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR
} from '../constants/actions'

export const refershToken = () => async (dispatch) => {
  try {
    dispatch({ type: REFRESH_TOKEN_START })

    dispatch(refreshTokenSuccess())
  } catch (e) {
    dispatch(refreshTokenFail())
    Auth.deauthenticate()
    window.location.assign('/login')
  }
}

export const refreshTokenFail = () => ({
  type: REFRESH_TOKEN_ERROR
})
export const refreshTokenSuccess = () => ({
  type: REFRESH_TOKEN_SUCCESS
})
