import React, { Component } from 'react'
import PropTypes from 'prop-types'

const withTitleAndDescription = (ComposedComponent) =>
  class WithTitleAndDescription extends Component {
    render() {
      const { title, description, cta, ...rest } = this.props

      return (
        <div className="userList">
          <div className="header">
            <div className="title big light">{title}</div>
            <div className="description light tiny m-top-x2 m-bottom-x2">
              {description}
            </div>
          </div>
          <ComposedComponent {...rest} />
          <div className="m-top-x2 t-center">
            <button className="cta">{cta}</button>
          </div>
        </div>
      )
    }
  }

withTitleAndDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
}

export default withTitleAndDescription
