import React from 'react'
import { Link } from 'react-router-dom'

const ProfileBox = () => (
  <div id="profileBox">
    <div className="profileItem m-top-x2">
      Ciao Gino &nbsp;
      <span className="lightGrey">|</span>&nbsp;
      <Link to="/settings" className="grey">
        <i className="far fa-cogs" />
      </Link>
      <span className="lightGrey">|</span>&nbsp;
      <Link to="/logout" className="grey">
        <i className="far fa-sign-out-alt" />
      </Link>
    </div>
  </div>
)

export default ProfileBox
