import { connect } from 'react-redux'

import { getMe } from '../actions/user'
import ProfileBox from '../components/ProfileBox'

const mapStateToProps = (state) => ({
  me: state.user.me
})

const mapDispatchToProps = (dispatch) => ({
  getMe: () => dispatch(getMe())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileBox)
