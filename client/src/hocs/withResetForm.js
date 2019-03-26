import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PasswordHandler from '../containers/PasswordHandler'

const withResetForm = (ComposedComponent) =>
  class modalResetForm extends Component {
    render() {
      const { open, dismissible, size, onClose } = this.props
      const nope = () => {}

      return (
        <ComposedComponent
          open={open}
          dismissible={dismissible}
          onClose={() => (onClose ? onClose() : nope())}
          size={size}
        >
          <PasswordHandler
            reset={true}
            cta="Update my password"
            showCtaIcon={false}
          />
        </ComposedComponent>
      )
    }
  }

withResetForm.propTypes = {
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  size: PropTypes.oneOf(['small', 'normal', 'big'])
}

export default withResetForm
