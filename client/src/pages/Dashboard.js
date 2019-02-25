import React, { Component } from 'react'
import Logo from '../components/Logo'
import Shortybar from '../components/ShortyBar'
import ShortylistFilter from '../components/ShortyListFilter'

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Logo />
        <div id="content" className="content m-top-x4">
          <Shortybar className="t-center m-bottom-x10" />
          <ShortylistFilter className="m-top-x2" />
        </div>
      </div>
    )
  }
}

export default Dashboard
