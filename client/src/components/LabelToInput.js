import React, { Fragment, Component } from 'react'
import PropType from 'prop-types'
import classnames from 'classnames'

class LabelToInput extends Component {
  state = { isInput: false }

  static propTypes = {
    type: PropType.oneOf(['text', 'number']),
    label: PropType.string.isRequired,
    labelClasses: PropType.string,
    inputClasses: PropType.string,
    onFilter: PropType.func,
    queryParam: PropType.string
  }

  static defaultProps = {
    type: 'text',
    labelClasses: '',
    inputClasses: '',
  }

  toggleState = () => this.setState({ isInput: !this.state.isInput })

  handleInputChange = (e) => {
    const { type, onFilter, queryParam } = this.props
    const value = e.target.value

    if (type === 'text' && onFilter) return onFilter(queryParam, value)
  }

  render() {
    const { isInput } = this.state
    const { label, labelClasses, inputClasses } = this.props

    const wrapperClasses = classnames('magicInput-wrapper', {
      labelClasses: !isInput && labelClasses.length > 0,
    })

    return (
      <span className={wrapperClasses}>
        {isInput ? (
          <Fragment>
            <input className={inputClasses} onChange={this.handleInputChange}/>
            <button onClick={this.toggleState} >
              <i className="fas fa-times" />
            </button>
          </Fragment>
        ) : (
          <span onClick={this.toggleState}>{label}</span>
        )}
      </span>
    )
  }
}

export default LabelToInput
