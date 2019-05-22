import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from 'react-responsive-modal'

import UserListTile from '../components/UserListTile'
import Loader from '../components/Loader'
import UserForm from '../components/UserForm'
import { USER_PER_PAGE } from '../constants/common'
import { startFetchUsers, startDeactivateUser } from '../actions/settings'

class UserList extends Component {
  state = { showModal: false }

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
    deactivate: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetch()
  }

  loadMore = () => {
    const { users, fetch } = this.props
    fetch(USER_PER_PAGE, users.length)
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  handleOnRemove = (externalId) => {
    if (!externalId) return
    this.props.deactivate(externalId)
  }

  render() {
    const { users, error, register } = this.props
    const { showModal } = this.state

    const wrapperClasses = classnames('content flex flex-wrap', {
      't-center': (!users && !error) || (!users && error)
    })

    return (
      <Fragment>
        <Modal open={showModal} onClose={this.toggleModal} center>
          <h1>Add new user</h1>
          <p className="tiny">
            Add new user able to access and create new short url. Each user be
            able to add new users.
          </p>
          <UserForm register={register} />
        </Modal>
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
        <div className="m-top-x2 t-center">
          <button className="cta" onClick={this.toggleModal}>
            ADD NEW USER
          </button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.settings.users.data,
  error: state.settings.users.error
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (limit, skip) => dispatch(startFetchUsers(limit, skip)),
  deactivate: (externalId) => dispatch(startDeactivateUser(externalId)),
  register: () => {}
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
