import { connect } from 'react-redux'

import ShortyList from '../components/ShortyList'

import { startFetchLinks, startFilter } from '../actions/dashboard'

const mapStateToProps = (state) => ({
  items: state.dashboard.results,
  hasMore: state.dashboard.hasMore,
  loading: state.dashboard.loading,
  error: state.dashboard.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  startFetch: (limit, skip) => dispatch(startFetchLinks(limit, skip)),
  startFilter: (key, value) => dispatch(startFilter(key, value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortyList)
