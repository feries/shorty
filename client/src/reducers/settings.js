import {
  USER_INFO_START,
  USER_INFO_SUCCESS,
  USER_INFO_ERROR,
  API_KEY_START,
  API_KEY_SUCCESS,
  API_KEY_ERROR,
  REMOVE_API_KEY_START,
  REMOVE_API_KEY_SUCCESS,
  REMOVE_API_KEY_ERROR,
  ADD_API_KEY_START,
  ADD_API_KEY_SUCCESS,
  ADD_API_KEY_ERROR,
  CUSTOM_MD_FETCH_START,
  CUSTOM_MD_FETCH_SUCCESS,
  CUSTOM_MD_FETCH_ERROR,
  USERS_FETCH_START,
  USERS_FETCH_ERROR,
  USERS_FETCH_SUCCESS,
  USERS_DEACTIVATE_START,
  USERS_DEACTIVATE_ERROR,
  USERS_DEACTIVATE_SUCCESS
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
    404: {
      data: '',
      error: false
    },
    500: {
      data: '',
      error: false
    }
  },
  users: {
    error: false,
    data: [],
    count: 0
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
    case ADD_API_KEY_START:
      return {
        ...state,
        loading: true
      }

    case REMOVE_API_KEY_ERROR:
    case ADD_API_KEY_ERROR:
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
          data: {
            ...state.keys.data,
            keys: deactivateKey(state.keys.data.keys, action.data.data)
          }
        }
      }

    case ADD_API_KEY_SUCCESS:
      return {
        ...state,
        loading: false,
        keys: {
          ...state.keys,
          data: {
            ...state.keys.data,
            keys: [...action.data.key, ...state.keys.data.keys]
          }
        }
      }

    case CUSTOM_MD_FETCH_START:
      return {
        ...state,
        loading: true
      }

    case CUSTOM_MD_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        pages: {
          ...state.pages,
          [action.data.page]: {
            data: '',
            error: true
          }
        }
      }

    case CUSTOM_MD_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: {
          ...state.pages,
          [action.data.page]: {
            data: action.data.content.data,
            error: false
          }
        }
      }

    case USERS_FETCH_START:
    case USERS_DEACTIVATE_START:
      return {
        ...state,
        loading: true
      }

    case USERS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        users: {
          error: true,
          data: [],
          count: 0
        }
      }

    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: {
          error: false,
          data: [...state.users.data, ...action.data.users],
          count: action.data.count
        }
      }

    case USERS_DEACTIVATE_ERROR:
      return {
        ...state,
        loading: false,
        users: {
          ...state.users,
          error: true
        }
      }

    case USERS_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        users: {
          ...state.users,
          error: false,
          data: deactivateKey(state.users.data, action.data),
          count: state.users.data.length
        }
      }

    default:
      return state
  }
}
