import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'
import { modalCustomStyle } from '../constants/style'

class ModalWithConfirm extends Component {
  static propTypes = {
    message: PropTypes.string,
    value: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    dismissible: PropTypes.bool,
    dismissLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
  }

  static defaultProps = {
    dismissible: true,
    dismissLabel: 'Dismiss',
    confirmLabel: 'Confirm',
  }

  render() {
    const {
      open,
      value,
      message,
      onConfirm,
      onDismiss,
      dismissLabel,
      confirmLabel,
    } = this.props
    return (
      <Modal
        open={open}
        onClose={onDismiss}
        center
        classNames={modalCustomStyle('normal')}
      >
        <p className="tiny m-top-x5">
          {message && message}
          {value && <span className="bold">{value}</span>}
        </p>
        <div className="modal--confirm modal--confirm-wrapper">
          <button
            onClick={onDismiss}
            className="dismiss button button-ghost-red normal m-right-x3"
          >
            {dismissLabel}
          </button>
          <button
            onClick={() => onConfirm().then(() => onDismiss())}
            className="confirm button button-primary normal"
          >
            {confirmLabel}
          </button>
        </div>
      </Modal>
    )
  }
}

export default ModalWithConfirm
