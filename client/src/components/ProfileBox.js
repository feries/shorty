import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from '../lib/Authentication'

class ProfileBox extends Component {
  static propTypes = {
    getMe: PropTypes.func.isRequired,
    me: PropTypes.shape({
      loading: PropTypes.bool,
      user: PropTypes.string
    }).isRequired
  }

  handleLogout = () => {
    Auth.deauthenticate()
    window.location.assign('/login')
  }

  componentDidMount() {
    this.props.getMe()
  }

  render() {
    const {
      me: { loading, user }
    } = this.props
    return (
      <div id="profileBox">
        <div className="profileItem m-top-x2">
          {loading ? '' : `Ciao ${user}`}&nbsp;
          <span className="lightGrey">|</span>&nbsp;
          <Link to="/settings" className="grey">
            <i className="far fa-cogs" />
          </Link>
          <span className="lightGrey">|</span>&nbsp;
          <button className="grey" onClick={this.handleLogout}>
            <i className="far fa-sign-out-alt" />
          </button>
        </div>
      </div>
    )
  }
}

export default ProfileBox
