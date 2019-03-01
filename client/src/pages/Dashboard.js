import React, { Component } from 'react'

import Logo from '../components/Logo'
import ShortyBar from '../containers/ShortyBar'
import ShortyList from '../containers/ShortyList'
import Toast from '../containers/Toast'

import withQr from '../hocs/withQr'
import withConfirm from '../hocs/withConfirm'
import Modal from '../components/Modal'

import { QR_CODE, TRASH } from '../constants/common'

const ModalWithQr = withQr(Modal)
const ModalWithConfirm = withConfirm(Modal)

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

  handleQrCode = (isOpenAction = true, value = '') => {
    const newState = {
      qrCodeModal: isOpenAction,
      qrCodeValue: isOpenAction ? value : ''
    }

    this.setState(newState)
  }

  confirmDelete = (isOpenAction = true, value = '', externalId = '') => {
    const newState = {
      confirmModal: isOpenAction,
      confirmValue: isOpenAction ? value : '',
      confirmAction: isOpenAction ? externalId : ''
    }

    this.setState(newState)
  }

  render() {
    const {
      qrCodeModal,
      qrCodeValue,
      confirmModal,
      confirmValue,
      confirmAction
    } = this.state

    return (
      <div className="container">
        <Logo className="m-top-x10" />
        <div id="content" className="content m-top-x4">
          <Toast />
          <ModalWithQr
            value={qrCodeValue}
            open={qrCodeModal}
            onClose={() => this.handleQrCode(false)}
          />
          <ModalWithConfirm
            value={confirmValue}
            open={confirmModal}
            action={confirmAction}
            onClose={() => this.confirmDelete(false)}
          />
          <ShortyBar className="t-center m-bottom-x10" />
          <ShortyList
            className="m-top-x4"
            handleButtonClick={this.handleButtonClick}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard
