import React from 'react'
import PropTypes from 'prop-types'

const Logo = ({ className }) => (
  <div id="header" className={className}>
    <div id="logo" className="t-center">
      <img src="./img/logo.svg" alt="Shorty Link" />
    </div>
    <div className="payoff">
      Short is beautiful! Save the world by making it shorter!
    </div>
  </div>
)

Logo.propTypes = {
  className: PropTypes.string
}

Logo.defaultProps = {
  className: ''
}

export default Logo
