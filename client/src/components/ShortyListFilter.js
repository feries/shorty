import React from 'react'
import PropTypes from 'prop-types'

const ShortyListFilter = ({ className }) => (
  <div id="shortyListFilter" className={className}>
    <div className="large m-bottom-x2 m-left-x3">Recent shortened links</div>
    <form>
      <input type="text" name="firstname" placeholder="Search..." />
      <div className="navigation">
        <div className="numberElements">
          <button>10</button>
          <button>25</button>
          <button>50</button>
        </div>
        <div className="navElements">
          <button>
            <i className="fas fa-angle-left" />
          </button>
          <button>
            <i className="fas fa-angle-right" />
          </button>
        </div>
      </div>
    </form>
  </div>
)

ShortyListFilter.propTypes = {
  className: PropTypes.string
}

ShortyListFilter.defaultProps = {
  className: ''
}

export default ShortyListFilter
