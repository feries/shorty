import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BackToHome = ({ className }) => (
  <div id="backToHome" className={className}>
    <Link to="/">
      <i className="fas fa-angle-left" />
      Back to home
    </Link>
  </div>
)

BackToHome.propTypes = {
  className: PropTypes.string
}

BackToHome.defaultProps = {
  className: ''
}

export default BackToHome
