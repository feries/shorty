import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { clearUrl, debounce } from '../lib/helpers'
import { TIME_RANGE } from '../constants/common'

class DetailTopInfo extends Component {
  state = { activeIndex: 0 }
  static propTypes = {
    className: PropTypes.string,
    longUrl: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    totalClick: PropTypes.number.isRequired,
    onRangeChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: ''
  }

  handleRangeChange = debounce((newIndex) => {
    if (!TIME_RANGE.has(newIndex)) return
    this.setState({ activeIndex: newIndex }, () => {
      this.props.onRangeChange(TIME_RANGE.get(newIndex))
    })
  }, 400)

  render() {
    const { className, longUrl, shortUrl, totalClick } = this.props
    const { activeIndex } = this.state

    return (
      <div id="detailTopInfo" className={className}>
        <div className="head">
          <div className="shortLink">
            {shortUrl && (
              <Fragment>
                Stats for:{' '}
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {clearUrl(shortUrl)}
                </a>
              </Fragment>
            )}
          </div>
          <div>{longUrl}</div>
        </div>
        <div className="box">
          <div className="total">
            Total clicks: <b>{totalClick}</b>
          </div>
          <div className="navigation">
            <button
              className={activeIndex === 0 ? 'active' : ''}
              onClick={() => this.handleRangeChange(0)}
            >
              All time
            </button>
            <button
              className={activeIndex === 1 ? 'active' : ''}
              onClick={() => this.handleRangeChange(1)}
            >
              Month
            </button>
            <button
              className={activeIndex === 2 ? 'active' : ''}
              onClick={() => this.handleRangeChange(2)}
            >
              Week
            </button>
            <button
              className={activeIndex === 3 ? 'active' : ''}
              onClick={() => this.handleRangeChange(3)}
            >
              Day
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailTopInfo
