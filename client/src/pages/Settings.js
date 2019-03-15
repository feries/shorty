import React, { Component } from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import EditableLabel from '../components/EditableLabel'

class Settings extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <div className="settings m-top-x4">
            <div className="PersonalInformations flex flex-grow">
              <div className="item">
                <EditableLabel
                  label="name"
                  fieldValue="Gabriele"
                  iconDefault={<i class="far fa-pencil-alt" />}
                  iconSubmit={<i class="fas fa-check" />}
                />
              </div>
              <div className="item">
                <EditableLabel
                  label="cognome"
                  fieldValue="Pellegrini"
                  iconDefault={<i class="far fa-pencil-alt" />}
                  iconSubmit={<i class="fas fa-check" />}
                />
              </div>
              <div className="item">
                <EditableLabel
                  label="email"
                  fieldValue="gabriele.pellegrini@feries.it"
                  iconDefault={<i class="far fa-pencil-alt" />}
                  iconSubmit={<i class="fas fa-check" />}
                />
              </div>
              <div className="item item-last">
                <button className="editPassword">EDIT PASSWORD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
