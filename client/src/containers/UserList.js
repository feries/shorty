import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import UserListTile from '../components/UserListTile'
import Loader from '../components/Loader'
import { USER_PER_PAGE } from '../constants/common'
import { startFetchUsers, startDeactivateUser } from '../actions/settings'

class UserList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        externalId: PropTypes.string.isRequired,
        active: PropTypes.oneOf([0, 1]).isRequired,
        email: PropTypes.string.isRequired
      })
    ).isRequired,
    error: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    deactivate: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch()
  }

  loadMore = () => {
    const { users, fetch } = this.props
    fetch(USER_PER_PAGE, users.length)
  }

  handleOnRemove = (externalId) => {
    if (!externalId) return
    this.props.deactivate(externalId)
  }

  render() {
    const { users, error } = this.props

    const wrapperClasses = classnames('content flex flex-wrap', {
      't-center': (!users && !error) || (!users && error)
    })

    return (
      <div className="userList">
        <div className={wrapperClasses}>
          {!users && !error ? (
            <Loader />
          ) : !users && error ? (
            'ERRORE!!'
          ) : users.length > 0 ? (
            users.map((el, i) => (
              <UserListTile
                key={i}
                onRemove={this.handleOnRemove}
                externalId={el.externalId}
                active={el.active}
                email={el.email}
              />
            ))
          ) : (
            'No Users'
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.settings.users.data,
  error: state.settings.users.error
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (limit, skip) => dispatch(startFetchUsers(limit, skip)),
  deactivate: (externalId) => dispatch(startDeactivateUser(externalId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
