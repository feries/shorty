import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'

const initialState = {
  shortUrl: '',
  longUrl: '',
  totalClick: 0,
  browserMap: {},
  osMap: {},
  dayMap: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_FETCH_START:
      return {
        ...state
      }

    case DETAIL_FETCH_SUCCESS:
      return {
        shortUrl: action.data.shortUrl,
        longUrl: action.data.targetUrl,
        totalClick: action.data.totalClick,
        browserMap: action.data.browserMap,
        osMap: action.data.osMap,
        dayMap: action.data.dayMap
      }

    case DETAIL_FETCH_ERROR:
      return {
        ...initialState
      }

    default:
      return state
  }
}
