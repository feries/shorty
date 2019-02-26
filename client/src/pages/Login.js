import React, { Component } from 'react'
import Logo from '../components/Logo'
import LoginBox from '../containers/LoginBox'

import Auth from '../lib/Authentication'

class Login extends Component {
  componentDidMount() {
    if (Auth.isAuthenticated()) window.location.assign('/')
  }

  render() {
    return (
      <div className="container">
        <Logo />
        <div id="content" className="content m-top-x4 t-center">
          <LoginBox />
        </div>
      </div>
    )
  }
}

export default Login
