import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PasswordHandler from '../components/PasswordHandler'
import {
  validateActivationHashStart,
  activateAccountStart
} from '../actions/password'

class PasswordHandlerContainer extends Component {
  static propTypes = {
    reset: PropTypes.bool,
    hash: PropTypes.string,
    validateHash: PropTypes.func.isRequired
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

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  validateHash: (hash) => dispatch(validateActivationHashStart(hash)),
  onPasswordChange: (
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
  mapStateToProps,
  mapDispatchToProps
)(PasswordHandlerContainer)
