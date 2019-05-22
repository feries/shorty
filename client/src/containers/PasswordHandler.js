import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PasswordHandler from '../components/PasswordHandler'
import {
  validateActivationHashStart,
  activateAccountStart,
  setNewPasswordStart
} from '../actions/password'

class PasswordHandlerContainer extends Component {
  static propTypes = {
    reset: PropTypes.bool,
    hash: PropTypes.string,
    validateHash: PropTypes.func.isRequired,
    onClose: PropTypes.func
  }

  static defaultProps = {
    reset: false
  }

  componentDidMount() {
    const { reset, validateHash, hash } = this.props
    if (!reset) {
      if (!hash) return window.location.assign('/500')
      validateHash(hash)
    }
  }

  render() {
    return <PasswordHandler {...this.props} />
  }
}

const mapDispatchToProps = (dispatch) => ({
  validateHash: (hash) => dispatch(validateActivationHashStart(hash)),
  onPasswordChange: (oldPassword, newPassword, rePassword) =>
    dispatch(setNewPasswordStart(oldPassword, newPassword, rePassword)),
  onActivateAccount: (
    reset = true,
    hash,
    email,
    oldPassword,
    newPassword,
    rePassword
  ) =>
    dispatch(
      activateAccountStart(
        reset,
        hash,
        email,
        oldPassword,
        newPassword,
        rePassword
      )
    )
})

export default connect(
  undefined,
  mapDispatchToProps
)(PasswordHandlerContainer)
