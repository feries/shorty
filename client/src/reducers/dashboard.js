import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_ERROR
} from '../constants/actions'

const initialState = {
  loading: false,
  results: [],
  hasMore: false,
  errorMessage: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_START:
    case FILTER_START:
      return {
        ...initialState,
        loading: true
      }

    case DASHBOARD_FETCH_SUCCESS:
    case FILTER_SUCCESS:
      return {
        loading: false,
        results: action.data.urls,
        errorMessage: null,
        hasMore: action.data.hasMore,
      }

    case DASHBOARD_FETCH_ERROR:
    case FILTER_ERROR:
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
