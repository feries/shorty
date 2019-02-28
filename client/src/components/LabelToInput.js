import React, { Fragment, Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import { mobileBreakPoint } from '../constants/common'

class LabelToInput extends Component {
  state = { isInput: false, isMobile: false }

  static propTypes = {
    type: PropType.oneOf(['text', 'number']),
    label: PropType.string.isRequired,
    labelClasses: PropType.string,
    inputClasses: PropType.string,
    onFilter: PropType.func,
    queryParam: PropType.string,
    inputIcon: PropType.node,
    placeholder: PropType.string
  }

  static defaultProps = {
    type: 'text',
    labelClasses: '',
    inputClasses: ''
  }

  componentDidMount() {
    this.viewportHandler()
    //window.onresize(this.viewportHandler)
  }

  viewportHandler() {
    const _winW = window.innerWidth
    this.setState({ isMobile: _winW <= mobileBreakPoint })
  }

  toggleState = () => this.setState({ isInput: !this.state.isInput })

  handleInputChange = (e) => {
    const { type, onFilter, queryParam } = this.props
    const value = e.target.value

    if (type === 'text' && onFilter) return onFilter(queryParam, value)
  }

  render() {
    const { isInput, isMobile } = this.state
    const {
      label,
      labelClasses,
      inputClasses,
      inputIcon,
      placeholder
    } = this.props

    const wrapperClasses = classnames('magicInput-wrapper', {
      labelClasses: !isInput && labelClasses.length > 0
    })

    return (
      <span className={wrapperClasses}>
        {isInput || isMobile ? (
          <Fragment>
            <input
              className={inputClasses}
              onChange={this.handleInputChange}
              placeholder={placeholder}
            />
            {!isMobile && (
              <button onClick={this.toggleState}>
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        ) : (
          <span onClick={this.toggleState}>
            {label}
            {inputIcon && <span>&nbsp; {inputIcon}</span>}
          </span>
        )}
      </span>
    )
  }
}

export default LabelToInput
