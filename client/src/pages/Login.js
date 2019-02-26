import React, { Component } from 'react'
import Logo from '../components/Logo'
import LoginBox from '../components/LoginBox'

class Login extends Component {
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
