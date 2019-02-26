import React from 'react'
import PropTypes from 'prop-types'

const Shortybar = ({ className }) => (
  <div id="shortyBar" className={className}>
    <form>
      <input type="text" name="firstname" placeholder="Paste your long URL" />
      <button>
        Shorten your link &nbsp;
        <i class="fas fa-link" />
      </button>
    </form>
  </div>
)

Shortybar.propTypes = {
  className: PropTypes.string
}

Shortybar.defaultProps = {
  className: ''
}

export default Shortybar
