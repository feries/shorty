import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired
  }
  static defaultProps = {
    title: 'Users',
    description: '',
    cta: 'CREATE NEW USER'
  }
  render() {
    const { title, description, cta } = this.props
    return (
      <div className="userList">
        <div className="header">
          <div className="title big light">{title}</div>
          <div className="description light tiny m-top-x2 m-bottom-x2">
            {description}
          </div>
        </div>
        <div className="content flex flex-wrap">
          <ul className="itemList m-right m-bottom">
            <li>claudio.quaglia@feries.it</li>
            <li>
              <button className="disable">
                <i className="far fa-minus-circle" />
              </button>
            </li>
          </ul>
          <ul className="itemList m-left m-bottom">
            <li>claudio.quaglia@feries.it</li>
            <li>
              <button className="disable">
                <i className="far fa-minus-circle" />
              </button>
            </li>
          </ul>
          <ul className="itemList m-right m-bottom disabled">
            <li>claudio.quaglia@feries.it</li>
            <li />
          </ul>
          <ul className="itemList m-left m-bottom">
            <li>claudio.quaglia@feries.it</li>
            <li>
              <button className="disable">
                <i className="far fa-minus-circle" />
              </button>
            </li>
          </ul>
        </div>
        <div className="m-top-x2 t-center">
          <button className="cta">{cta}</button>
        </div>
      </div>
    )
  }
}

export default UserList
