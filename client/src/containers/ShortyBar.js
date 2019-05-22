import { connect } from 'react-redux'
import { startSubmitLink, setGlobalToast } from '../actions/dashboard'
import ShortyBar from '../components/ShortyBar'

const mapStateToProps = (state) => ({
  host: state.dashboard.host
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (url, short) => dispatch(startSubmitLink(url, short)),
  onError: (message) => dispatch(setGlobalToast(message))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShortyBar)
