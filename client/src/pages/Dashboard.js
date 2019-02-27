import React, { Component } from 'react'

import Logo from '../components/Logo'
import ShortyBar from '../containers/ShortyBar'
import ShortyList from '../containers/ShortyList'

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Logo />
        <div id="content" className="content m-top-x4">
          <ShortyBar className="t-center m-bottom-x10" />
          <ShortyList className="m-top-x4" />
        </div>
      </div>
    )
  }
}

export default Dashboard
