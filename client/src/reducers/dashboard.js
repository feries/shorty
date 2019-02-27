import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR
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
        results: action.data,
        errorMessage: null
      }

    case DASHBOARD_FETCH_ERROR:
      return {
        loading: false,
        results: [],
        errorMessage: action.error
      }

    case SUBMIT_LINK_START:
      return {
        ...state,
        loading: true
      }

    case SUBMIT_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        results: [
          action.data,
          ...state.results
        ],
        errorMessage: null
      }

    case SUBMIT_LINK_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }

    default:
      return state
  }
}
