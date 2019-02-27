import React, { Component } from 'react'
import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import DetailTopInfo from '../components/DetailTopInfo'

class Detail extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <DetailTopInfo />
        </div>
      </div>
    )
  }
}

export default Detail
