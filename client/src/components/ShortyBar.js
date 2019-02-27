import React from 'react'
import PropTypes from 'prop-types'

const ShortyBar = ({ className }) => (
  <div id="shortyBar" className={className}>
    <form>
      <input type="text" name="url" placeholder="Paste your long URL" />
      <button>
        Shorten your link &nbsp;
        <i className="fas fa-link" />
      </button>
    </form>
  </div>
)

ShortyBar.propTypes = {
  className: PropTypes.string
}

ShortyBar.defaultProps = {
  className: ''
}

export default ShortyBar
