import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const withConfirm = (ComposedComponent) =>
  class modalWithConfirm extends Component {
    static defaultProps = {
      dismissible: true,
      dismissLabel: 'Dismiss',
      confirmLabel: 'Confirm'
    }

    render() {
      const {
        open,
        value,
        message,
        dismissible,
        onConfirm,
        onDismiss,
        dismissLabel,
        confirmLabel
      } = this.props
      return (
        <ComposedComponent
          open={open}
          dismissible={dismissible}
          onClose={onDismiss}
        >
          <p>
            {message && message}
            {value && (
              <Fragment>
                <br />
                <br />
                <b>{value}</b>
              </Fragment>
            )}
          </p>
          <div className="modal--confirm modal--confirm-wrapper">
            <button onClick={onDismiss} className="dismiss">
              {dismissLabel}
            </button>
            <button
              onClick={() => onConfirm().then(() => onDismiss())}
              className="confirm"
            >
              {confirmLabel}
            </button>
          </div>
        </ComposedComponent>
      )
    }
  }

withConfirm.propTypes = {
  message: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
  dismissible: PropTypes.bool,
  dismissLabel: PropTypes.string,
  confirmLabel: PropTypes.string
}

export default withConfirm
