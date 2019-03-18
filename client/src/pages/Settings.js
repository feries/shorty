import React, { Component } from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import ApiKeyList from '../components/ApiKeyList'
import PersonalInformationsFrom from '../containers/PersonalInformationsForm'

class Settings extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <div className="settings box flex m-top-x4">
            <PersonalInformationsFrom />
          </div>
          <div className="box m-top-x6">
            <ApiKeyList />
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
