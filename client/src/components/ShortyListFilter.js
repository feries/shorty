import React from 'react'
import PropTypes from 'prop-types'

const ShortylistFilter = ({ className }) => (
  <div id="shortyListFilter">
    <div className="large">Recent shortened links</div>
    <form>
      <input type="text" name="firstname" placeholder="Paste your long URL" />
      <div className="numberElements">
        <button>10</button>
        <button>25</button>
        <button>50</button>
      </div>
      <div className="navElements">
        <button>
          <i class="fas fa-angle-left" />
        </button>
        <button>
          <i class="fas fa-angle-right" />
        </button>
      </div>
    </form>
  </div>
)

ShortylistFilter.propTypes = {
  className: PropTypes.string
}

ShortylistFilter.defaultProps = {
  className: ''
}

export default ShortylistFilter
