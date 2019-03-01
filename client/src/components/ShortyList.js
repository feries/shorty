import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

import LabelToInput from './LabelToInput'

import { QR_CODE, TRASH, COPY, nope } from '../constants/common'
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
    startFilter: PropTypes.func,
    handleButtonClick: PropTypes.func.isRequired
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

  restoreFirstPage = debounce(() => {
    this.props.startFetch()
  }, 800)

  handleFilter = debounce((queryParam, queryValue) => {
    if (queryValue.length === 0) return this.restoreFirstPage()

    if (!queryParam || !queryValue || queryValue.length < 3) return

    this.props.startFilter(queryParam, queryValue)
  }, 250)

  openShortLink = (shortedUrl, externalId) => {
    this.props.shortLinkClick(externalId)
    window.open(`https://feri.es/${shortedUrl}`, '_blank')
  }

  render() {
    const { className, items, hasMore } = this.props

    return (
      <Fragment>
        <div id="shortyList" className={className}>
          <ul className="head">
            <li className="originalUrl">
              <LabelToInput
                label="Original URL"
                placeholder="search for original URL"
                queryParam="targetUrl"
                onFilter={this.handleFilter}
                inputIcon={<i className="fas fa-search" />}
                onClose={this.restoreFirstPage}
              />
            </li>
            <li className="created">Created</li>
            <li className="shortUrl">
              <LabelToInput
                label="Short URL"
                placeholder="search for short URL"
                queryParam="sourceUrl"
                onFilter={this.handleFilter}
                inputIcon={<i className="fas fa-search" />}
                onClose={this.restoreFirstPage}
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
                <button className="copy" name={COPY}>
                  <i className="far fa-copy" />
                </button>
                &nbsp;
                <button
                  className="shortUrlLink"
                  onClick={() =>
                    this.openShortLink(item.shortedUrl, item.externalId)
                  }
                  rel="noopener noreferrer"
                >
                  {`feri.es/${item.shortedUrl}`}
                </button>
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
                <button
                  className="qr"
                  onClick={() =>
                    this.props.handleButtonClick(
                      QR_CODE,
                      `https://feri.es/${item.shortedUrl}`
                    )
                  }
                >
                  <i className="fas fa-qrcode" />
                </button>
                <button
                  className="delete"
                  onClick={() =>
                    this.props.handleButtonClick(
                      TRASH,
                      `https://feri.es/${item.shortedUrl}`,
                      item.externalId
                    )
                  }
                >
                  <i className="far fa-trash-alt" />
                </button>
              </li>
            </ul>
          ))}
          {hasMore && (
            <div className="loadMore">
              <button>
                <i className="fas fa-angle-down" /> &nbsp;Load more&nbsp;
                <i className="fas fa-angle-down" />
              </button>
            </div>
          )}
        </div>
      </Fragment>
    )
  }
}

export default ShortyList
