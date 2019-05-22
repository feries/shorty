import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const UserListTile = ({ externalId, active, email, onRemove }) => {
  const classes = classnames('itemList m-right m-bottom', {
    disabled: active === 0
  })

  return (
    <ul className={classes}>
      <li>{email}</li>
      <li>
        <button className="disable" onClick={() => onRemove(externalId)}>
          <i className="far fa-minus-circle" />
        </button>
      </li>
    </ul>
  )
}

UserListTile.propTypes = {
  externalId: PropTypes.string.isRequired,
  active: PropTypes.oneOf([0, 1]).isRequired,
  email: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default UserListTile
