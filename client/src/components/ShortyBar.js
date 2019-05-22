import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isUrl } from '../lib/validators'
import { SHORT_URL_LENGTH } from '../constants/common'

class ShortyBar extends Component {
  state = { url: '', custom: '' }

  static propTypes = {
    className: PropTypes.string,
    onError: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    host: PropTypes.shape({
      isValid: PropTypes.bool.isRequired,
      targetUrl: PropTypes.string.isRequired,
      short: PropTypes.string
    }).isRequired
  }

  static defaultProps = {
    className: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { url, custom } = this.state
    if (!url) return

    if (custom && custom.length > SHORT_URL_LENGTH)
      return this.props.onError({
        type: 'error',
        message: `The custom URL can contain a maximum of ${SHORT_URL_LENGTH} characters`
      })

    if (!isUrl(url) && this.props.onError) {
      return this.props.onError({
        type: 'error',
        message:
          'Invalid Url, you must provide a valid url address, in format `http(s)://www.domain.com/path`'
      })
    }

    this.props.onSubmit(url, custom)
    this.resetState()
  }

  resetState = () => this.setState({ url: '', custom: '' })

  handleChange = (evt, what) => this.setState({ [what]: evt.target.value })

  render() {
    const { url, custom } = this.state
    const { className } = this.props

    return (
      <div id="shortyBar" className={className}>
        <form>
          <input
            className="shortyUrl"
            type="text"
            name="url"
            placeholder="Paste your long URL"
            value={url}
            onChange={(evt) => this.handleChange(evt, 'url')}
          />
          <input
            className="shortyCustom"
            type="text"
            name="urlCustom"
            placeholder="Insert your custom short url"
            value={custom}
            onChange={(evt) => this.handleChange(evt, 'custom')}
          />
          <button onClick={this.handleSubmit}>
            Shorten your link &nbsp;
            <i className="fas fa-link" />
          </button>
        </form>
      </div>
    )
  }
}

export default ShortyBar
