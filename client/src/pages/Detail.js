import React, { Component } from 'react'
import Logo from '../components/Logo'

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <Logo className="logosmall" />
          <div>ciao</div>
        </div>
      </div>
    )
  }
}

export default Dashboard
