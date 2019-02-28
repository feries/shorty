import { connect } from 'react-redux'

import { unsetGlobalToast } from '../actions/dashboard'
import Toast from '../components/Toast'

const mapStateToProps = (state) => ({
  show: state.toast.show,
  message: state.toast.message,
  type: state.toast.type
})

const mapDispatchToProps = dispatch => ({
  dismiss: () => dispatch(unsetGlobalToast())
})

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
