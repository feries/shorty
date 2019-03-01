import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { startDelete } from '../actions/dashboard'

const withConfirm = (ComposedComponent) => {
  class modalWithConfirm extends Component {
    render() {
      const {
        open,
        value,
        action,
        dismissible,
        onClose,
        onConfirm
      } = this.props
      return (
        <ComposedComponent
          open={open}
          dismissible={dismissible}
          onClose={onClose}
        >
          <p>
            Are you sure you want to delete this short link? Once deleted it
            will no longer be reachable by users.
            <br />
            <br />
            <b>{value}</b>
          </p>
          <div className="modal--confirm modal--confirm-wrapper">
            <button onClick={onClose} className="dismiss">
              Dismiss
            </button>
            <button
              onClick={() => onConfirm(action).then(() => onClose())}
              className="confirm"
            >
              Confirm
            </button>
          </div>
        </ComposedComponent>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onConfirm: (externalId) => dispatch(startDelete(externalId))
  })

  return connect(
    null,
    mapDispatchToProps
  )(modalWithConfirm)
}

withConfirm.propTypes = {
  value: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default withConfirm
