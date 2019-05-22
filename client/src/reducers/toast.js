import {
  GLOBAL_SET_TOAST,
  GLOBAL_UNSET_TOAST,
  SHORT_LINK_COPY
} from '../constants/actions'

const initialState = { show: false, message: null, type: 'info' }

export default (state = initialState, action) => {
  switch (action.type) {
    case SHORT_LINK_COPY:
    case GLOBAL_SET_TOAST:
      return {
        show: true,
        message: action.data.message,
        type: action.data.type
      }

    case GLOBAL_UNSET_TOAST:
      return {
        ...initialState
      }

    default:
      return state
  }
}
