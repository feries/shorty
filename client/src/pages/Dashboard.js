import React, { Component } from 'react'

import Logo from '../components/Logo'
import ProfileBox from '../components/ProfileBox'
import ShortyBar from '../containers/ShortyBar'
import ShortyList from '../containers/ShortyList'
import Toast from '../containers/Toast'
import DeleteLinkWithConfirm from '../containers/DeleteLinkWithConfirm'

import withQr from '../hocs/withQr'
import withHostForm from '../hocs/withHostForm'
import Modal from '../components/Modal'

import { QR_CODE, TRASH } from '../constants/common'

const ModalWithQr = withQr(Modal)
const ModalWithForm = withHostForm(Modal)

class Dashboard extends Component {
  state = {
    qrCodeModal: false,
    qrCodeValue: '',
    confirmModal: false,
    confirmValue: '',
    confirmAction: ''
  }

  handleButtonClick = (what, value, externalId = null) => {
    if (what === QR_CODE) this.handleQrCode(true, value)
    else if (what === TRASH) this.confirmDelete(true, value, externalId)
  }

  confirmDelete = (isOpenAction = true, value = '', externalId = '') => {
    const newState = {
      confirmModal: isOpenAction,
      confirmValue: isOpenAction ? value : '',
      confirmAction: isOpenAction ? externalId : ''
    }

    this.setState(newState)
  }

  handleQrCode = (isOpenAction = true, value = '') => {
    const newState = {
      qrCodeModal: isOpenAction,
      qrCodeValue: isOpenAction ? value : ''
    }

    this.setState(newState)
  }

  render() {
    const {
      qrCodeModal,
      qrCodeValue,
      confirmValue,
      confirmAction,
      confirmModal
    } = this.state

    return (
      <div>
        <Toast />
        <div className="container">
          <ProfileBox />
          <Logo className="m-top-x10" />
          <div id="content" className="content m-top-x4">
            <ModalWithForm />
            <DeleteLinkWithConfirm
              confirmValue={confirmValue}
              confirmAction={confirmAction}
              confirmModal={confirmModal}
              onClose={() => this.confirmDelete(false)}
            />
            <ModalWithQr
              value={qrCodeValue}
              open={qrCodeModal}
              onClose={() => this.handleQrCode(false)}
            />

            <ShortyBar className="t-center m-bottom-x10" />
            <ShortyList
              className="m-top-x4"
              handleButtonClick={this.handleButtonClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
