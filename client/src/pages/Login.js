import React, { Component } from 'react'
import Logo from '../components/Logo'
import LoginBox from '../containers/LoginBox'

import Auth from '../lib/Authentication'
import Toast from '../containers/Toast'

class Login extends Component {
  componentDidMount() {
    if (Auth.isAuthenticated()) window.location.assign('/')
  }

  render() {
    return (
      <div className="container">
        <Toast />
        <Logo />
        <div id="content" className="content m-top-x4 t-center">
          <LoginBox />
        </div>
      </div>
    )
  }
}

export default Login
