import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'

class Editor extends Component {
  state = {
    value: '',
    initialValue: '',
    tab: 'write'
  }

  static propTypes = {
    pageType: PropTypes.oneOf(['404', '500']).isRequired,
    cta: PropTypes.string,
    page404: PropTypes.shape({
      data: PropTypes.string,
      error: PropTypes.bool
    }),
    page500: PropTypes.shape({
      data: PropTypes.string,
      error: PropTypes.bool
    }),
    save: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired
  }

  static defaultProps = {
    cta: 'SAVE',
    page404: {
      data: '',
      error: false
    },
    page500: {
      data: '',
      error: false
    }
  }

  constructor(props) {
    super(props)
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    })
    this.label = null
  }

  componentDidMount() {
    const { pageType, fetch } = this.props
    this.label = `page${pageType}`

    const value = this.props[this.label].data || ''

    this.setState({ initialValue: value })
    fetch(pageType)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props[this.label].data !== prevProps[this.label].data)
      this.updateEditorValue()
  }

  updateEditorValue = () => {
    const value = this.props[this.label].data
    this.setState({ value })
  }

  handleStateChange = (what, value) => {
    this.setState({ [what]: value })
  }

  handleSave = () => {
    const { value, initialValue } = this.state
    const { pageType } = this.props

    if (!value || value.length === 0 || value === initialValue) return

    this.props.save(value, pageType)
  }

  render() {
    const { cta } = this.props
    const { value, tab } = this.state

    return (
      <Fragment>
        <ReactMde
          onChange={(value) => this.handleStateChange('value', value)}
          onTabChange={(tab) => this.handleStateChange('tab', tab)}
          value={value}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          selectedTab={tab}
        />
        <div className="m-top-x2 t-center" onClick={this.handleSave}>
          <button className="cta">{cta}</button>
        </div>
      </Fragment>
    )
  }
}

export default Editor
