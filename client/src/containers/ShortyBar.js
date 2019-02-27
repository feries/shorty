import { connect } from 'react-redux'

import { startSubmitLink, submitLinkError } from '../actions/dashboard'

import ShortyBar from '../components/ShortyBar'

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (url) => dispatch(startSubmitLink(url)),
  onError: (message) => dispatch(submitLinkError(message))
})

export default connect(
  null,
  mapDispatchToProps
)(ShortyBar)
