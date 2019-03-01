import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_ERROR,
  DELETE_URL_START,
  DELETE_URL_SUCCESS,
  DELETE_URL_ERROR
} from '../constants/actions'

import filter from '../selectors/filter'

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
        hasMore: action.data.hasMore
      }

    case DASHBOARD_FETCH_ERROR:
    case FILTER_ERROR:
      return {
        loading: false,
        results: []
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
        results: [action.data, ...state.results]
      }

    case SUBMIT_LINK_ERROR:
      return {
        ...state,
        loading: false
      }

    case DELETE_URL_START:
      return {
        ...state,
        loading: true
      }

    case DELETE_URL_SUCCESS:
      return {
        ...state,
        results: filter(state.results, action.data),
        loading: false
      }

    case DELETE_URL_ERROR:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}
