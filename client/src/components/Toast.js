import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Toast extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
    icon: PropTypes.node,
    dismissible: PropTypes.bool,
    timeout: PropTypes.number,
    dismiss: PropTypes.func
  }

  static defaultProps = {
    type: 'success',
    icon: null,
    dismissible: false,
    timeout: 5500
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) this.toggleToast(this.props.show)
  }

  toggleToast = (show = true) => {
    if (show && this.props.timeout) {
      window.setTimeout(() => {
        this.props.dismiss()
      }, this.props.timeout)
    }
  }

  render() {
    const {
      title,
      message,
      show,
      icon,
      dismissible,
      type,
      dismiss
    } = this.props

    //if (!show) return null

    const wrapperClasses = classnames('toast toast-wrapper', {
      animateToast: show,
      'toast--info': type === 'info',
      'toast--success': type === 'success',
      'toast--error': type === 'error',
      'toast--warning': type === 'warning'
    })

    return (
      <div className={wrapperClasses}>
        {dismissible && <i className="fa fa-times" onClick={dismiss} />}
        {icon && <span className="toast-icon">{icon}</span>}
        <span>
          {title && <h4>{title}</h4>}
          {message && <p>{message}</p>}
        </span>
      </div>
    )
  }
}

export default Toast
