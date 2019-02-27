import React, { Component } from 'react'
import PropTypes from 'prop-types'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { GO_TO, QR_CODE, TRASH, COPY } from '../constants/common'

dayjs.extend(relativeTime)

class ShortyList extends Component {
  static propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        externalId: PropTypes.string.isRequired,
        shortedUrl: PropTypes.string.isRequired,
        targetUrl: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        urlClick: PropTypes.number.isRequired
      })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    startFetch: PropTypes.func.isRequired
  }

  static defaultProps = {
    className: '',
    items: [],
    loading: false
  }

  componentDidMount() {
    this.props.startFetch()
  }

  handleButtonClick = (props) => {
    console.log(props)
  }

  render() {
    const { className, items } = this.props

    return (
      <div id="shortyList" className={className}>
        <ul className="head">
          <li className="originalUrl">Original URL</li>
          <li className="created">Created</li>
          <li className="shortUrl">Short URL</li>
          <li className="clicks">Clicks</li>
          <li className="actions" />
        </ul>
        {items.map((item, index) => (
          <ul className="itemList" key={index}>
            <li className="originalUrl">
              <span className="label">Original URL:&nbsp;</span>
              <a
                href={item.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.targetUrl}
              </a>
            </li>
            <li className="created">
              <span className="label">Created:&nbsp;</span>
              {dayjs(item.createdAt).fromNow()}
            </li>
            <li className="shortUrl">
              <span className="label">Short URL:&nbsp;</span>
              <button name={COPY}>
                <i className="far fa-copy" />
              </button>
              &nbsp;
              <a
                href={`https://feri.es/${item.shortedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`feri.es/${item.shortedUrl}`}
              </a>
            </li>
            <li className="clicks">
              <span className="label">Clicks:&nbsp;</span>
              {item.urlClick}
            </li>
            <li className="actions">
              <button name={GO_TO} className="stats" target={item.externalId}>
                <i className="fas fa-chart-bar" />
                <span>stats</span>
              </button>
              <button name={QR_CODE}>
                <i className="fas fa-qrcode" />
              </button>
              <button name={TRASH}>
                <i className="far fa-trash-alt" />
              </button>
            </li>
          </ul>
        ))}
      </div>
    )
  }
}

export default ShortyList
