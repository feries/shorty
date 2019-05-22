import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const withTitleAndDescription = (ComposedComponent) =>
  class WithTitleAndDescription extends Component {
    render() {
      const { title, description, ...rest } = this.props

      return (
        <Fragment>
          <div className="header">
            {title && <div className="title big light">{title}</div>}
            <div className="description light tiny m-top-x2 m-bottom-x2">
              {description && description}
            </div>
          </div>
          <ComposedComponent {...rest} />
        </Fragment>
      )
    }
  }

withTitleAndDescription.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

export default withTitleAndDescription
