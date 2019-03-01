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
    size: PropTypes.oneOf(['small', 'normal', 'big']),
    onClose: PropTypes.func
  }

  static defaultProps = {
    dismissible: true,
    onClose: nope,
    size: 'normal'
  }

  constructor(props) {
    super(props)
    this.modal = React.createRef()
    this.close = React.createRef()
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

  handleDismiss = ({ target }) => {
    if (target === this.close.current) return this.toggleModal(false)

    if (
      !this.props.dismissible ||
      (this.modal && this.modal.current !== target)
    )
      return

    this.toggleModal()
  }

  render() {
    const { isOpen } = this.state
    const { children, size } = this.props

    const classes = classnames('modal modal-backdrop', {
      hidden: !isOpen
    })

    const modalPanelClasses = classnames('modal modal-panel', {
      small: size === 'small',
      normal: size === 'normal',
      big: size === 'big'
    })

    return (
      <div className={classes} onClick={this.handleDismiss}>
        <div className="modalCenter" ref={this.modal}>
          <div className={modalPanelClasses}>
            <div className="closeButton">
              <i
                className="fas fa-times"
                ref={this.close}
                onClick={this.toggleModal}
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
