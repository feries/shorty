import { connect } from 'react-redux'

import ShortyList from '../components/ShortyList'

import { startFetchLinks } from '../actions/dashboard'

const mapStateToProps = (state) => ({
  items: state.dashboard.results,
  loading: state.dashboard.loading,
  error: state.dashboard.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  startFetch: (limit, skip) => dispatch(startFetchLinks(limit, skip))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortyList)
