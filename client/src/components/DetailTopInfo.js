import React from 'react'
import PropTypes from 'prop-types'

const DetailTopInfo = ({ className }) => (
  <div id="detailTopInfo" className={className}>
    <div>
      Stats for:{' '}
      <a href="kutt.it/aRmg0u" target="_blank">
        kutt.it/aRmg0u
      </a>
    </div>
    <div>
      https://tiger.feries.it/roma-pigneto-vicino-termini-e-s-giovanni/1965505/booking?from=11/03/2019&to=15/03/2019&guests=2
    </div>
    <div className="box">
      <div>Total clicks: 123</div>
      <div className="navigation">
        <button>All time</button>
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
