import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  startAddHost,
  addHostError,
  setGlobalToast
} from '../actions/dashboard'
import { isUrl } from '../lib/validators'

const withHostForm = (ComposedComponent) => {
  class modalHostForm extends Component {
    constructor(props) {
      super(props)
      this.input = React.createRef()
    }

    render() {
      const {
        open,
        value,
        dismissible,
        onClose,
        onSubmit,
        onError
      } = this.props
      return (
        <ComposedComponent
          open={open}
          dismissible={dismissible}
          onClose={onClose}
        >
          <p>
            <b>{value}</b>
          </p>
          <p>
            You're trying to add a scream we can't associate with a short
            version. Enter the short version of the domain in the field.
          </p>
          <input ref={this.input} />
          <button
            onClick={(e) => {
              e.preventDefault()
              const inputVal = this.input.current.value

              if (!isUrl(inputVal))
                return onError({
                  type: 'error',
                  message:
                    'You must provide a valid URL in the format http(s)://<short-domain>'
                })

              onSubmit(inputVal, value).then(() => {
                onClose && onClose()
              })
            }}
          >
            Save
          </button>
        </ComposedComponent>
      )
    }
  }

  const mapStateToProps = (state) => ({
    open: !state.dashboard.hostIsValid
  })

  const mapDispatchToProps = (dispatch) => ({
    onSubmit: (shortUrl, fullUrl) => dispatch(startAddHost(shortUrl, fullUrl)),
    onError: (error) => {
      dispatch(addHostError())
      dispatch(setGlobalToast(error))
    }
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(modalHostForm)
}

withHostForm.propTypes = {
  value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func
}

export default withHostForm
