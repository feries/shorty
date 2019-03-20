import {
  USER_INFO_START,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR,
  API_KEY_START,
  API_KEY_SUCCESS,
  API_KEY_ERROR,
  REMOVE_API_KEY_START,
  REMOVE_API_KEY_SUCCESS,
  REMOVE_API_KEY_ERROR
} from '../constants/actions'

import deactivateKey from '../selectors/deactivateKey'

const initialState = {
  loading: false,
  me: {
    error: false,
    data: null
  },
  keys: {
    error: false,
    data: null
  },
  pages: {
    404: '',
    500: ''
  },
  users: {
    error: false,
    data: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_INFO_START:
      return {
        ...state,
        loading: true,
        me: {
          error: false,
          data: null
        }
      }
    case USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        me: {
          error: true,
          data: null
        }
      }
    case USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        me: {
          error: false,
          data: action.data
        }
      }

    case API_KEY_START:
      return {
        ...state,
        loading: true,
        keys: {
          error: false,
          data: null
        }
      }

    case API_KEY_ERROR:
      return {
        ...state,
        loading: false,
        keys: {
          error: true,
          data: null
        }
      }

    case API_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        keys: {
          error: false,
          data: action.data
        }
      }

    case REMOVE_API_KEY_START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_API_KEY_ERROR:
      return {
        ...state,
        loading: false
      }

    case REMOVE_API_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        keys: {
          ...state.keys,
          data: deactivateKey(state.keys.data, action.data.externalId)
        }
      }

    default:
      return state
  }
}
