import React, { Component} from 'react'
import PropTypes from 'prop-types'
import Qrcode from 'qrcode.react'

const withQr = (ComposedComponent) => {
  class modalWithQr extends Component {

    render() {
      const { open, value, dismissible, onClose } = this.props
      return(
        <ComposedComponent open={open} dismissible={dismissible} onClose={onClose}>
          <Qrcode value={value}/>
        </ComposedComponent>
      )
    }
  }

  return modalWithQr
}

withQr.propTypes = {
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func
}

export default withQr
