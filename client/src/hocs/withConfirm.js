import React, { Component} from 'react'
import PropTypes from 'prop-types'

const withConfirm = (ComposedComponent) => {
  class modalWithConfirm extends Component {

    render() {
      const { open, value, dismissible, onClose, onConfirm, onDismiss } = this.props
      return(
        <ComposedComponent open={open} dismissible={dismissible} onClose={onClose}>
          {value}
          <div className="modal--confirm modal--confirm-wrapepr">
            <button onClick={onDismiss}>
              Dismiss
            </button>
            <button onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </ComposedComponent>
      )
    }
  }

  return modalWithConfirm
}

withConfirm.propTypes = {
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export default withConfirm
