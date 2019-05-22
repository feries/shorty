import {
  CUSTOM_MARKUP_START,
  CUSTOM_MARKUP_SUCCESS,
  CUSTOM_MARKUP_ERROR
} from '../constants/actions'

const initialState = { customError: { loading: false, markdown: '' } }

export default (state = initialState, action) => {
  switch (action.type) {
    case CUSTOM_MARKUP_START:
      return {
        ...state,
        customError: {
          loading: true,
          markdown: ''
        }
      }

    case CUSTOM_MARKUP_SUCCESS:
      return {
        ...state,
        customError: {
          loading: false,
          markdown: action.data.data
        }
      }

    case CUSTOM_MARKUP_ERROR:
      return {
        ...state,
        customError: {
          loading: false,
          markdown: ''
        }
      }

    default:
      return state
  }
}
