import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { nope } from '../constants/common'

class Modal extends Component {
  state = { isOpen: false }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    dismissible: true,
    onClose: nope
  }

  constructor(props) {
    super(props)
    this.modal = React.createRef()
  }

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) this.toggleModal(this.props.open)
  }

  toggleModal = (newState) => {
    this.toggleScrollLock()
    const _state = newState !== undefined ? newState : !this.state.isOpen
    this.setState({ isOpen: _state })

    if (!_state) this.props.onClose()
  }

  handleDismiss = (evt) => {
    if (
      !this.props.dismissible ||
      (this.modal && this.modal.contains(evt.target))
    )
      return

    this.toggleModal()
  }

  render() {
    const { isOpen } = this.state
    const { children } = this.props

    const classes = classnames('modal modal-backdrop', {
      hidden: !isOpen
    })

    return (
      <div className={classes} onClick={this.handleDismiss} ref={this.modal}>
        <div className="modalCenter">
          <div className="modal modal-panel">
            <div className="closeButton">
              <i className="fas fa-times" />
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
