import {
  DASHBOARD_FETCH_START,
  DASHBOARD_FETCH_SUCCESS,
  DASHBOARD_FETCH_ERROR,
  SUBMIT_LINK_START,
  SUBMIT_LINK_SUCCESS,
  SUBMIT_LINK_ERROR,
  SUBMIT_LINK_ERROR_HOST,
  FILTER_START,
  FILTER_SUCCESS,
  FILTER_ERROR,
  DELETE_URL_START,
  DELETE_URL_SUCCESS,
  DELETE_URL_ERROR,
  SHORT_LINK_CLICK,
  ADD_HOST_START,
  ADD_HOST_ERROR,
  ADD_HOST_SUCCESS
} from '../constants/actions'

import filter from '../selectors/filter'

const initialState = {
  loading: false,
  results: [],
  hasMore: false,
  errorMessage: null,
  host: {
    isValid: true,
    targetUrl: '',
    short: ''
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_FETCH_START:
      return {
        ...state,
        loading: true
      }

    case FILTER_START:
      return {
        ...initialState,
        loading: true
      }

    case DASHBOARD_FETCH_SUCCESS:
    case FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.data.clearResults
          ? action.data.urls
          : [...state.results, ...action.data.urls],
        hasMore: action.data.hasMore
      }

    case DASHBOARD_FETCH_ERROR:
    case FILTER_ERROR:
      return {
        ...state,
        loading: false,
        results: []
      }

    case SUBMIT_LINK_START:
    case ADD_HOST_START:
    case DELETE_URL_START:
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

    case DELETE_URL_ERROR:
    case SUBMIT_LINK_ERROR:
      return {
        ...state,
        loading: false
      }

    case DELETE_URL_SUCCESS:
      return {
        ...state,
        results: filter(state.results, action.data),
        loading: false
      }

    case SHORT_LINK_CLICK:
      return {
        ...state,
        results: state.results
      }

    case SUBMIT_LINK_ERROR_HOST:
      return {
        ...state,
        host: {
          isValid: false,
          targetUrl: action.data.getUrlDetail,
          short: action.data.short
        }
      }

    case ADD_HOST_ERROR:
      return {
        ...state,
        loading: false,
        host: {
          ...initialState.host,
          isValid: true
        }
      }

    case ADD_HOST_SUCCESS:
      return {
        ...state,
        loading: false,
        host: {
          ...initialState.host
        }
      }

    default:
      return state
  }
}
