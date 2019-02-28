import React, { Fragment, Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

import { debounce } from '../lib/helpers'
import { mobileBreakPoint, nope } from '../constants/common'

class LabelToInput extends Component {
  state = { isInput: false, isMobile: false, value: '' }

  static propTypes = {
    type: PropType.oneOf(['text', 'number']),
    label: PropType.string.isRequired,
    labelClasses: PropType.string,
    inputClasses: PropType.string,
    onFilter: PropType.func,
    queryParam: PropType.string,
    inputIcon: PropType.node,
    placeholder: PropType.string,
    onClose: PropType.func
  }

  static defaultProps = {
    type: 'text',
    labelClasses: '',
    inputClasses: '',
    onClose: nope
  }

  constructor(props){
    super(props)
    this.input = React.createRef();
  }

  componentDidMount() {
    this.viewportHandler()
    window.addEventListener('resize', this.viewportHandler, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.viewportHandler)
  }

  viewportHandler = debounce(() => {
    const _winW = window.innerWidth
    this.setState({ isMobile: _winW <= mobileBreakPoint })
  }, 150)

  toggleState = () => {
    const newState = !this.state.isInput
    this.setState({ isInput: newState }, () => {
      if (newState) {
        this.setState({ value: '' })
        this.input.current.focus();
      }
      if (!newState && (this.state.value !== '' && this.state.value.length >= 3))
        this.props.onClose()
    })
  }

  handleInputChange = (e) => {
    const { type, onFilter, queryParam } = this.props
    const { value } = e.target

    this.setState({ value })

    if (type === 'text' && onFilter) return onFilter(queryParam, value)
  }

  render() {
    const { isInput, isMobile, value } = this.state
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
              ref={this.input}
              className={inputClasses}
              onChange={this.handleInputChange}
              placeholder={placeholder}
              value={value}
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
