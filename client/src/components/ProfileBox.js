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
          <span className="primary m-left m-right">|</span>
          <Link to="/settings" className="dark normal">
            <i className="far fa-cogs" />
          </Link>
          <span className="primary m-left m-right">|</span>
          <button className="dark normal" onClick={this.handleLogout}>
            <i className="far fa-sign-out-alt" />
          </button>
        </div>
      </div>
    )
  }
}

export default ProfileBox
