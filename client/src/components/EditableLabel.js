import React, { Component } from 'react'
import PropType from 'prop-types'

class EditableLabel extends Component {
  state = { isInput: false, value: '' }
  static propTypes = {
    iconDefault: PropType.string,
    iconSubmit: PropType.string,
    label: PropType.string,
    fieldValue: PropType.string
  }

  static defaultProps = {
    label: '',
    fieldValue: ''
  }

  constructor(props) {
    super(props)
    this.input = React.createRef()
  }

  toggleState = () => {
    const newState = !this.state.isInput
    this.setState({ isInput: newState }, () => {
      this.input.current.focus()
    })
  }

  render() {
    const { isInput } = this.state
    const { iconDefault, iconSubmit, label, fieldValue } = this.props

    return (
      <div className="editableLabel">
        <div className="flex flex-space">
          <div className="field-value">
            {isInput ? (
              <input ref={this.input} placeholder={fieldValue} />
            ) : (
              fieldValue
            )}
          </div>
          {iconDefault && (
            <button
              onClick={this.toggleState}
              className={isInput ? 'iconSubmit' : 'iconDefault'}
            >
              {isInput ? iconSubmit : iconDefault}
            </button>
          )}
        </div>
        <div className="separator" />
        <label>{label}</label>
      </div>
    )
  }
}

export default EditableLabel
