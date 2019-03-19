import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

class Editor extends Component {
  state = {
    value: ''
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired
  }
  static defaultProps = {
    title: '',
    description: '',
    cta: 'SAVE'
  }
  constructor(props) {
    super(props)
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    })
  }
  handleValueChange = (value) => {
    this.setState({ value })
  }
  render() {
    const { title, description, cta } = this.props
    return (
      <div className="editors">
        <div className="title big light">{title}</div>
        <div className="description light tiny m-top-x2 m-bottom-x2">
          {description}
        </div>
        <ReactMde
          onChange={this.handleValueChange}
          value={this.state.value}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
        />
        <div className="m-top-x2 t-center">
          <button className="cta">{cta}</button>
        </div>
      </div>
    )
  }
}

export default Editor
