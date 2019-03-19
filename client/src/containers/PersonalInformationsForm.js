import React, { Component } from 'react'
import EditableLabel from '../components/EditableLabel'

class PersonalInformationsForm extends Component {
  render() {
    return (
      <div className="w-100">
        <div className="light big m-bottom-x2">Personal Informations</div>
        <div className="personal-informations flex flex-grow">
          <div className="item">
            <EditableLabel label="name" fieldValue="Gabriele" />
          </div>
          <div className="item">
            <EditableLabel label="cognome" fieldValue="Pellegrini" />
          </div>
          <div className="item">
            <EditableLabel
              label="email"
              fieldValue="gabriele.pellegrini@feries.it"
            />
          </div>
          <div className="item item-last">
            <button className="editPassword">EDIT PASSWORD</button>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalInformationsForm
