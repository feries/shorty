import React, { Component } from 'react'

import Logo from '../components/Logo'
import ShortyBar from '../containers/ShortyBar'
import ShortyList from '../containers/ShortyList'

import withQr from '../hocs/withQr'
import withConfirm from '../hocs/withConfirm'
import Modal from '../components/Modal'

import { QR_CODE, TRASH } from '../constants/common'

const ModalWithQr = withQr(Modal)
const ModalWithConfirm = withConfirm(Modal)

class Dashboard extends Component {
  state = { qrCodeModal: false, qrCodeValue: '' }

  handleButtonClick = (what, value) => {
    if (what === QR_CODE)
      this.handleQrCode(true, value)
    else if (what === TRASH)
      this.confirmDisable()
  }

  handleQrCode = (isOpenAction = true, value = '') => {
    const newState =  {
      qrCodeModal: isOpenAction ,
      qrCodeValue: isOpenAction ? value : ''
    }

    this.setState(newState)
  }

  confirmDisable = () => {}

  render() {
    const { qrCodeModal, qrCodeValue } = this.state

    return (
      <div className="container">
        <Logo />
        <div id="content" className="content m-top-x4">
          <ModalWithQr value={qrCodeValue} open={qrCodeModal} onClose={() => this.handleQrCode(false)}/>
          <ShortyBar className="t-center m-bottom-x10" />
          <ShortyList className="m-top-x4" handleButtonClick={this.handleButtonClick}/>
        </div>
      </div>
    )
  }
}

export default Dashboard
