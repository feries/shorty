import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from '../lib/helpers'

class PasswordHandler extends Component {
  state = {
    email: '',
    oldPassword: '',
    newPassword: '',
    rePassword: '',
    isSubmitDisabled: true
  }

  static propTypes = {
    reset: PropTypes.bool.isRequired,
    onActivateAccount: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    hash: PropTypes.string,
    cta: PropTypes.string.isRequired,
    showCtaIcon: PropTypes.bool,
    ctaIcon: PropTypes.node,
    ctaClasses: PropTypes.string,
    inputClasses: PropTypes.string
  }

  static defaultProps = {
    showCtaIcon: true,
    ctaIcon: <i className="far fa-sign-in-alt" />,
    ctaClasses: '',
    inputClasses: ''
  }

  componentDidMount() {
    this.canSubmit()
  }

  canSubmit = debounce(() => {
    const { email, oldPassword, newPassword, rePassword } = this.state
    const { reset } = this.props

    const emailInvalid = email === ''
    const oldPasswordInvalid = oldPassword === ''
    const newPasswordInvalid = newPassword === ''
    const rePasswordInvalid = rePassword === ''
    const match = newPassword === rePassword

    let invalid = true
    if (reset)
      invalid =
        oldPasswordInvalid ||
        newPasswordInvalid ||
        rePasswordInvalid ||
        !match ||
        oldPassword === newPassword
    else
      invalid =
        emailInvalid || newPasswordInvalid || rePasswordInvalid || !match

    this.setState({
      isSubmitDisabled: invalid
    })
  }, 100)

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, oldPassword, newPassword, rePassword } = this.state
    const { hash, reset } = this.props
    if (reset) this.props.onPasswordChange(oldPassword, newPassword, rePassword)
    else
      this.props.onActivateAccount(
        reset,
        hash,
        email,
        oldPassword,
        newPassword,
        rePassword
      )
  }

  handleChange = (evt, what) => {
    this.setState({ [what]: evt.target.value })
    this.canSubmit()
  }

  render() {
    const {
      reset,
      cta,
      showCtaIcon,
      ctaIcon,
      ctaClasses,
      inputClasses
    } = this.props
    const {
      email,
      oldPassword,
      newPassword,
      rePassword,
      isSubmitDisabled
    } = this.state

    return (
      <div id="loginBox">
        {!reset && <div className="invitation">Welcome.</div>}
        <form className="loginBox-form">
          {reset ? (
            <input
              type="password"
              value={oldPassword}
              className={inputClasses}
              placeholder="insert your current password"
              onChange={(e) => this.handleChange(e, 'oldPassword')}
              autoFocus={true}
            />
          ) : (
            <input
              type="email"
              value={email}
              className={inputClasses}
              placeholder="insert your registration email"
              onChange={(e) => this.handleChange(e, 'email')}
              autoFocus={true}
            />
          )}
          <input
            type="password"
            value={newPassword}
            className={inputClasses}
            placeholder="insert your new password"
            onChange={(e) => this.handleChange(e, 'newPassword')}
          />
          <input
            type="password"
            value={rePassword}
            className={inputClasses}
            placeholder="confirm your new password"
            onChange={(e) => this.handleChange(e, 'rePassword')}
          />
          <button
            className={ctaClasses}
            disabled={isSubmitDisabled}
            onClick={this.handleSubmit}
          >
            {cta} &nbsp;
            {showCtaIcon && ctaIcon}
          </button>
        </form>
      </div>
    )
  }
}

export default PasswordHandler
