import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const withCta = (ComposedComponent) =>
  class WithCta extends Component {
    render() {
      const { cta, action, ...rest } = this.props
      return (
        <Fragment>
          <ComposedComponent {...rest} />
          <div className="m-top-x2 t-center" onClick={action}>
            <button className="cta">{cta}</button>
          </div>
        </Fragment>
      )
    }
  }

withCta.propTypes = {
  cta: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default withCta
