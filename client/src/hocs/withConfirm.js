import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { startDelete } from '../actions/dashboard'

const withConfirm = (ComposedComponent) => {
  class modalWithConfirm extends Component {
    render() {
      const { open, value, dismissible, onClose, onConfirm } = this.props
      return (
        <ComposedComponent
          open={open}
          dismissible={dismissible}
          onClose={onClose}
        >
          {value}
          <div className="modal--confirm modal--confirm-wrapper">
            <button onClick={onClose} className="dismiss">
              Dismiss
            </button>
            <button onClick={onConfirm} className="confirm">
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
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default withConfirm
