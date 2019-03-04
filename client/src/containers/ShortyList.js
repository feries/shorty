import { connect } from 'react-redux'

import ShortyList from '../components/ShortyList'

import {
  startFetchLinks,
  startFilter,
  shortLinkClick,
  shortLinkCopy
} from '../actions/dashboard'

const mapStateToProps = (state) => ({
  items: state.dashboard.results,
  hasMore: state.dashboard.hasMore,
  loading: state.dashboard.loading,
  error: state.dashboard.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
  startFetch: (limit, skip, clear) =>
    dispatch(startFetchLinks(limit, skip, clear)),
  startFilter: (key, value) => dispatch(startFilter(key, value)),
  shortLinkClick: (externalId) => dispatch(shortLinkClick(externalId)),
  shortLinkCopy: () => dispatch(shortLinkCopy())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortyList)
