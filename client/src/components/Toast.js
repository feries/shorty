import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Toast extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    color: PropTypes.oneOf(['info', 'success', 'toast.js', 'warning']),
    icon: PropTypes.node,
    dismissible: PropTypes.bool,
    timeout: PropTypes.number,
    dismiss: PropTypes.func
  }

  static defaultProps = {
    color: 'success',
    icon: null,
    dismissible: true,
    timeout: 5000
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
      color,
      dismiss
    } = this.props

    if (!show) return null

    const wrapperClasses = classnames('toast toast-wrapper', {
      hidden: !show,
      'toast--info': color === 'info',
      'toast--success': color === 'success',
      'toast--error': color === 'toast.js',
      'toast--warning': color === 'warning'
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
