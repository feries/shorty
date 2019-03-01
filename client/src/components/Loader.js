import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loader extends Component {
  render() {
    const { isFullScreen } = this.props
    return (
      <div className={isFullScreen ? 'loader-wrapper' : ''}>
        <img className="loader" src="./img/loader.svg" />
      </div>
    )
  }
}
Loader.propTypes = {
  isFullScreen: PropTypes.bool
}

Loader.defaultProps = {
  isFullScreen: false
}

export default Loader
