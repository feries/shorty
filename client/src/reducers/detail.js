import {
  DETAIL_FETCH_START,
  DETAIL_FETCH_SUCCESS,
  DETAIL_FETCH_ERROR
} from '../constants/actions'

const initialState = {
  shortUrl: '',
  longUrl: '',
  totalClick: 0,
  range: [],
  clicks: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_FETCH_START:
      return {}

    case DETAIL_FETCH_SUCCESS:
      return {}

    case DETAIL_FETCH_ERROR:
      return {}

    default:
      return state
  }
}
