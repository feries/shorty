import React from 'react'
import PropTypes from 'prop-types'

const BackToHome = ({ className }) => (
  <div id="backToHome" className={className}>
    <button>
      <i className="fas fa-angle-left" />
      Back to home
    </button>
  </div>
)

BackToHome.propTypes = {
  className: PropTypes.string
}

BackToHome.defaultProps = {
  className: ''
}

export default BackToHome
