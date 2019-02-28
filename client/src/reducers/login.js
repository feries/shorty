import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants/actions'

const initialState = {
  loading: false,
  data: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...initialState,
        loading: true
      }

    case LOGIN_SUCCESS:
      window.location.assign('/')
      return {
        loading: false,
        data: action.data
      }

    case LOGIN_ERROR:
      return {
        loading: false,
        data: {}
      }

    default:
      return state
  }
}
