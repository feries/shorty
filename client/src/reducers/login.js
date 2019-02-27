import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'

const initialState = {
  loading: false,
  data: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...initialState,
        loading: true
      }

    case LOGIN_SUCCESS:
      return {
        loading: false,
        data: action.data,
        error: null
      }

    case LOGIN_ERROR:
      return {
        loading: false,
        data: {},
        error: action.error
      }

    default:
      return state
  }
}
