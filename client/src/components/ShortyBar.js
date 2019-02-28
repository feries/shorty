import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isUrl } from '../lib/validators'

class ShortyBar extends  Component {
  state = { url : '' }

  static propTypes = {
    className: PropTypes.string,
    onError: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { url } = this.state
    if (!url) return

    if (!isUrl(url) && this.props.onError) {
      const shape = {
        type: 'error',
        message:'Invalid Url, you must provide a valid url address, in format `http(s)://www.domain.com/path`'
      }
      return this.props.onError(shape)
    }

    this.props.onSubmit(url).then(() => {
      this.setState({ url: '' })
    })

  }

  handleChange = evt => this.setState({ url: evt.target.value })

  render() {
    const { url } = this.state
    const { className } = this.props

    return (
      <div id="shortyBar" className={className}>
        <form>
          <input type="text" name="url" placeholder="Paste your long URL" value={url} onChange={this.handleChange}/>
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
