import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { debounce } from '../lib/helpers'
import { isEmail } from '../lib/validators'

class UserForm extends Component {
  state = { isSubmitDisabled: true, name: '', surname: '', email: '' }

  static propTypes = {
    className: PropTypes.string,
    register: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: ''
  }

  componentDidMount() {
    this.canSubmit()
  }

  canSubmit = debounce(() => {
    const { name, surname, email } = this.state
    const emailInvalid = email === '' || !isEmail(email)
    const nameInvalid = name === ''
    const surnameInvalid = surname === ''
    this.setState({
      isSubmitDisabled: emailInvalid || nameInvalid || surnameInvalid
    })
  }, 250)

  handleSubmit = (e) => {
    e.preventDefault()
    const { name, surname, email } = this.state
    this.props.register(name, surname, email)
  }

  handleChange = (evt, what) => {
    this.setState({ [what]: evt.target.value })
    this.canSubmit()
  }

  render() {
    const { isSubmitDisabled, name, surname, email } = this.state

    return (
      <form className="loginBox-form">
        <input
          type="text"
          value={name}
          placeholder="Insert new user name"
          onChange={(e) => this.handleChange(e, 'name')}
          autoFocus={true}
          className="w-100 m-top-x2"
        />
        <input
          type="text"
          value={surname}
          placeholder="Insert new user surname"
          onChange={(e) => this.handleChange(e, 'surname')}
          className="w-100 m-top-x2"
        />
        <input
          type="email"
          value={email}
          placeholder="Insert new user email"
          onChange={(e) => this.handleChange(e, 'email')}
          className="w-100 m-top-x2"
        />
        <button
          disabled={isSubmitDisabled}
          onClick={this.handleSubmit}
          className="button button-primary normal uppercase m-top-x3"
        >
          <i className="far fa-user-plus " />
          &nbsp; Register
        </button>
      </form>
    )
  }
}

export default UserForm
