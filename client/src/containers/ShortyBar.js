import { connect } from 'react-redux'

import { startSubmitLink, setGlobalToast } from '../actions/dashboard'

import ShortyBar from '../components/ShortyBar'

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (url) => dispatch(startSubmitLink(url)),
  onError: (message) => dispatch(setGlobalToast(message))
})

export default connect(
  null,
  mapDispatchToProps
)(ShortyBar)
