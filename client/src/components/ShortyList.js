import React, { Component } from 'react'
import PropTypes from 'prop-types'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Qrcode from 'qrcode.react'
import { Link } from 'react-router-dom'

import LabelToInput from './LabelToInput'

import { GO_TO, QR_CODE, TRASH, COPY, nope } from '../constants/common'
import { debounce } from '../lib/helpers'

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
    hasMore: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    startFetch: PropTypes.func.isRequired,
    startFilter: PropTypes.func
  }

  static defaultProps = {
    className: '',
    items: [],
    loading: false,
    startFilter: nope
  }

  componentDidMount() {
    this.props.startFetch()
  }

  handleButtonClick = (props) => {
    console.log(props)
  }

  handleFilter = debounce((queryParam, queryValue) => {
    if (!queryParam || !queryValue || queryValue.length < 3) return

    this.props.startFilter(queryParam, queryValue)
  }, 250)

  render() {
    const { className, items, hasMore } = this.props

    return (
      <div id="shortyList" className={className}>
        <ul className="head">
          <li className="originalUrl">
            <LabelToInput
              label="Original URL"
              placeholder="search for original URL"
              queryParam="targetUrl"
              onFilter={this.handleFilter}
              inputIcon={<i class="fas fa-search" />}
            />
          </li>
          <li className="created">Created</li>
          <li className="shortUrl">
            <LabelToInput
              label="Short URL"
              placeholder="search for short URL"
              queryParam="sourceUrl"
              onFilter={this.handleFilter}
              inputIcon={<i class="fas fa-search" />}
            />
          </li>
          <li className="clicks">N° Click</li>
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
              <Link to={`/detail/${item.externalId}`} className="stats">
                <i className="fas fa-chart-bar" />
                <span>stats</span>
              </Link>
              <button name={QR_CODE} className="qr">
                <i className="fas fa-qrcode" />
              </button>
              <button name={TRASH} className="delete">
                <i className="far fa-trash-alt" />
              </button>
            </li>
          </ul>
        ))}
        {hasMore && (
          <div className="footer">
            <button>Load more</button>
          </div>
        )}
      </div>
    )
  }
}

export default ShortyList
