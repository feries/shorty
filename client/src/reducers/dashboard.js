import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR
} from '../constants/actions'

const initialState = {
  loading: false,
  results: [],
  errorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_START:
      return {
        ...initialState,
        loading: true
      }

    case DASHBOARD_FETCH_SUCCESS:
      return {
        loading: false,
        results: action.payload,
        errorMessage: null
      }

    case DASHBOARD_FETCH_ERROR:
      return {
        loading: false,
        results: [],
        errorMessage: action.error
      }

    default:
      return state
  }
}
