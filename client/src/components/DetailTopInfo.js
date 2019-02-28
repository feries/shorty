import React from 'react'
import PropTypes from 'prop-types'

const DetailTopInfo = ({ className }) => (
  <div id="detailTopInfo" className={className}>
    <div className="head">
      <div className="shortLink">
        Stats for:{' '}
        <a href="kutt.it/aRmg0u" target="_blank">
          feri.es/aRmg0u
        </a>
      </div>
      <div>
        https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
      </div>
    </div>
    <div className="box">
      <div className="total">
        Total clicks: <b>123</b>
      </div>
      <div className="navigation">
        <button className="active">All time</button>
        <button>Month</button>
        <button>Week</button>
        <button>Day</button>
      </div>
    </div>
  </div>
)

DetailTopInfo.propTypes = {
  className: PropTypes.string
}

DetailTopInfo.defaultProps = {
  className: ''
}

export default DetailTopInfo
