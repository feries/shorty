import { connect } from 'react-redux'
import { startSubmitLink, setGlobalToast } from '../actions/dashboard'
import ShortyBar from '../components/ShortyBar'

const mapStateToProps = (state) => ({
  hostIsValid: state.dashboard.hostIsValid
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (url, short) => dispatch(startSubmitLink(url, short)),
  onError: (message) => dispatch(setGlobalToast(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortyBar)
