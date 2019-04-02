import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-responsive-modal'

import {
  startAddHost,
  addHostError,
  setGlobalToast
} from '../actions/dashboard'
import { isUrl } from '../lib/validators'

class AddHost extends Component {
  static propTypes = {
    open: PropTypes.bool,
    host: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  handleOnClose = () => {
    const { onBeforeClose, onClose } = this.props

    onBeforeClose()
    onClose && onClose()
  }

  render() {
    const { open, host, onSubmit, onError, onClose } = this.props

    return (
      <Modal open={open} onClose={this.handleOnClose} center>
        <div className="flex flex-wrap flex-center word-break">
          <div className="m-top-x3 medium t-center alert">
            You're trying to add an URL we can't associate with a short version.{' '}
            <br />
            Enter the short version of the domain:{' '}
          </div>
          <div className="dark m-top-x3 bold">{host}</div>
          <div className="flex flex-wrap flex-center m-top-x3">
            <input
              ref={this.input}
              placeholder="Insert your custom SHORT HOST"
              className="w-100 m-top-x2 m-bottom-x2"
            />
            <button
              className="confirm"
              onClick={(e) => {
                e.preventDefault()
                const inputVal = this.input.current.value

                if (!isUrl(inputVal))
                  return onError({
                    type: 'error',
                    message:
                      'You must provide a valid URL in the format http(s)://<short-domain>'
                  })

                onSubmit(inputVal, host).then(() => {
                  onClose && onClose()
                })
              }}
            >
              ADD NEW DOMAIN URL
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  open: !state.dashboard.host.isValid,
  host: state.dashboard.host.targetUrl
})

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (shortUrl, fullUrl) => dispatch(startAddHost(shortUrl, fullUrl)),
  onError: (error) => {
    dispatch(addHostError())
    dispatch(setGlobalToast(error))
  },
  onBeforeClose: () => dispatch(addHostError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddHost)
