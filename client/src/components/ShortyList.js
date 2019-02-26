import React from 'react'
import PropTypes from 'prop-types'

const ShortyList = ({ className }) => (
  <div id="shortyList" className={className}>
    <ul className="head">
      <li className="originalUrl">Original URL</li>
      <li className="created">Created</li>
      <li className="shortUrl">Short URL</li>
      <li className="clicks">Clicks</li>
      <li className="actions" />
    </ul>
    <ul className="itemList">
      <li className="originalUrl">
        <span className="label">Original URL:&nbsp;</span>
        <a
          href="https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2"
          target="_blank"
        >
          https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
        </a>
      </li>
      <li className="created">
        <span className="label">Created:&nbsp;</span>less than a minute ago
      </li>
      <li className="shortUrl">
        <span className="label">Short URL:&nbsp;</span>
        <button>
          <i class="far fa-copy" />
        </button>
        &nbsp;
        <a href="kutt.it/aRmg0u/" target="_blank">
          kutt.it/aRmg0u/
        </a>
      </li>
      <li className="clicks">
        <span className="label">Clicks:&nbsp;</span>999.000.000
      </li>
      <li className="actions">
        <button className="stats">
          <i class="fas fa-chart-bar" />
          <span>stats</span>
        </button>{' '}
        <button>
          <i class="fas fa-qrcode" />
        </button>
        <button>
          <i class="far fa-trash-alt" />
        </button>
      </li>
    </ul>
    <ul className="itemList">
      <li className="originalUrl">
        <span className="label">Original URL:&nbsp;</span>
        <a
          href="https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2"
          target="_blank"
        >
          https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
        </a>
      </li>
      <li className="created">
        <span className="label">Created:&nbsp;</span>less than a minute ago
      </li>
      <li className="shortUrl">
        <span className="label">Short URL:&nbsp;</span>
        <button>
          <i class="far fa-copy" />
        </button>
        &nbsp;
        <a href="kutt.it/aRmg0u/" target="_blank">
          kutt.it/aRmg0u/
        </a>
      </li>
      <li className="clicks">
        <span className="label">Clicks:&nbsp;</span>999.000.000
      </li>
      <li className="actions">
        <button className="stats">
          <i class="fas fa-chart-bar" />
          <span>stats</span>
        </button>{' '}
        <button>
          <i class="fas fa-qrcode" />
        </button>
        <button>
          <i class="far fa-trash-alt" />
        </button>
      </li>
    </ul>
    <ul className="itemList">
      <li className="originalUrl">
        <span className="label">Original URL:&nbsp;</span>
        <a
          href="https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2"
          target="_blank"
        >
          https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
        </a>
      </li>
      <li className="created">
        <span className="label">Created:&nbsp;</span>less than a minute ago
      </li>
      <li className="shortUrl">
        <span className="label">Short URL:&nbsp;</span>
        <button>
          <i class="far fa-copy" />
        </button>
        &nbsp;
        <a href="kutt.it/aRmg0u/" target="_blank">
          kutt.it/aRmg0u/
        </a>
      </li>
      <li className="clicks">
        <span className="label">Clicks:&nbsp;</span>999.000.000
      </li>
      <li className="actions">
        <button className="stats">
          <i class="fas fa-chart-bar" />
          <span>stats</span>
        </button>{' '}
        <button>
          <i class="fas fa-qrcode" />
        </button>
        <button>
          <i class="far fa-trash-alt" />
        </button>
      </li>
    </ul>
    <ul className="itemList">
      <li className="originalUrl">
        <span className="label">Original URL:&nbsp;</span>
        <a
          href="https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2"
          target="_blank"
        >
          https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
        </a>
      </li>
      <li className="created">
        <span className="label">Created:&nbsp;</span>less than a minute ago
      </li>
      <li className="shortUrl">
        <span className="label">Short URL:&nbsp;</span>
        <button>
          <i class="far fa-copy" />
        </button>
        &nbsp;
        <a href="kutt.it/aRmg0u/" target="_blank">
          kutt.it/aRmg0u/
        </a>
      </li>
      <li className="clicks">
        <span className="label">Clicks:&nbsp;</span>999.000.000
      </li>
      <li className="actions">
        <button className="stats">
          <i class="fas fa-chart-bar" />
          <span>stats</span>
        </button>{' '}
        <button>
          <i class="fas fa-qrcode" />
        </button>
        <button>
          <i class="far fa-trash-alt" />
        </button>
      </li>
    </ul>
  </div>
)

ShortyList.propTypes = {
  className: PropTypes.string
}

ShortyList.defaultProps = {
  className: ''
}

export default ShortyList
