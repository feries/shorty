import {
  GET_ME_START,
  GET_ME_SUCCESS,
  GET_ME_ERROR
} from '../constants/actions'

const initialState = { me: { loading: false, user: '' } }

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ME_START:
      return {
        ...state,
        me: {
          loading: true,
          user: ''
        }
      }

    case GET_ME_SUCCESS:
      return {
        ...state,
        me: {
          loading: false,
          user: action.data
        }
      }

    case GET_ME_ERROR:
      return {
        ...state,
        me: {
          loading: false,
          user: ''
        }
      }

    default:
      return state
  }
}
