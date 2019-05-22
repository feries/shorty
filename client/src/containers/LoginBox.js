import { connect } from 'react-redux'

import { loginStart } from '../actions/login'

import Login from '../components/LoginBox'

const mapDispatchToProps = (dispatch) => ({
  onLogin: (username, password) => dispatch(loginStart(username, password))
})

export default connect(
  null,
  mapDispatchToProps
)(Login)
