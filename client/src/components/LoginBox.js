import React from 'react'
import PropTypes from 'prop-types'

const LoginBox = ({ className }) => (
  <div id="loginBox" className={className}>
    <div className="invitation">
      Welcome back! Please login to your account.
    </div>
    <form>
      <input type="email" name="email" placeholder="insert your email" />
      <input type="password" name="password" placeholder="password" />
      <button>
        login &nbsp;
        <i class="far fa-sign-in-alt" />
      </button>
    </form>
  </div>
)

LoginBox.propTypes = {
  className: PropTypes.string
}

LoginBox.defaultProps = {
  className: ''
}

export default LoginBox
