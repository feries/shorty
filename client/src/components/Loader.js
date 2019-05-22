import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ isFullScreen }) => (
  <div className={isFullScreen ? 'loader-wrapper' : ''}>
    <img alt="loader" className="loader" src="../img/loader.svg" />
  </div>
)

Loader.propTypes = {
  isFullScreen: PropTypes.bool
}

Loader.defaultProps = {
  isFullScreen: false
}

export default Loader
