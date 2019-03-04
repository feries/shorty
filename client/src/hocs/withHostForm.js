import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { addHostError, startAddHost } from '../actions/dashboard'
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
          <div className="flex flex-wrap flex-center">
            <div className="m-top-x3 medium t-center secondary">
              You're trying to add a scream we can't associate with a short
              version. <br />
              Enter the short version of the domain:{' '}
              <b className="dark">{value}</b>.
            </div>
            <div className="flex flex-wrap flex-center m-top-x3">
              <input
                ref={this.input}
                placeholder="Insert your custom SHORT HOST"
                className="w-100 m-top-x2 m-bottom-x2"
              />
              <button
                className="confirm"
                onClick={() => {
                  const inputVal = this.input.current.value

                  if (!isUrl(inputVal))
                    return onError({
                      type: 'error',
                      message: 'You must provide a valid URL'
                    })

                  onSubmit(inputVal, value).then(() => {
                    onClose()
                  })
                }}
              >
                Save
              </button>
            </div>
          </div>
        </ComposedComponent>
      )
    }
  }

  const mapStateToProps = (state) => ({
    open: !state.dashboard.hostIsValid
  })

  const mapDispatchToProps = (dispatch) => ({
    onSubmit: (shortUrl, fullUrl) => dispatch(startAddHost(shortUrl, fullUrl)),
    onError: (error) => dispatch(addHostError(error))
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
