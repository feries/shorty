import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'

const initialState = {
  loading: false,
  user: {}
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
        user: action.data.user
      }

    case LOGIN_ERROR:
      return {
        loading: false,
        user: {}
      }

    default:
      return state
  }
}
