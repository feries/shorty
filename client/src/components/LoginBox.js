import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { debounce } from '../lib/helpers'
import { isEmail } from '../lib/validators'

class LoginBox extends Component {
  state = { isSubmitDisabled: true, username: '', password: '' }

  static propTypes = {
    className: PropTypes.string,
    onLogin: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: ''
  }

  componentDidMount() {
    this.canSubmit()
  }

  canSubmit = debounce(() => {
    const { username, password } = this.state
    const usernameInvalid = username === '' || !isEmail(username)
    const passwordInvalid = password === ''
    this.setState({
      isSubmitDisabled: usernameInvalid || passwordInvalid
    })
  }, 250)

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.onLogin(username, password)
  }

  handleChange = (evt, what) => {
    this.setState({ [what]: evt.target.value })
    this.canSubmit()
  }

  render() {
    const { className } = this.props
    const { isSubmitDisabled, username, password } = this.state

    return (
      <div id="loginBox" className={className}>
        <div className="invitation">
          Welcome back! Please login to your account.
        </div>
        <form className="loginBox-form">
          <input
            type="email"
            value={username}
            placeholder="insert your email"
            onChange={(e) => this.handleChange(e, 'username')}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => this.handleChange(e, 'password')}
          />
          <button disabled={isSubmitDisabled} onClick={this.handleSubmit}>
            login &nbsp;
            <i className="far fa-sign-in-alt" />
          </button>
        </form>
      </div>
    )
  }
}

export default LoginBox
