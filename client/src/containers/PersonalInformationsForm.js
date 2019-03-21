import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import EditableLabel from '../components/EditableLabel'
import { startFetchUserInfo } from '../actions/settings'
import Loader from '../components/Loader'

class PersonalInformationForm extends Component {
  static propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string
    }),
    error: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchUserData()
  }

  render() {
    const { user, error } = this.props

    if (!user && !error) return <Loader />
    if (!user && error) return 'ERRORE!!!'

    const wrapperClasses = classnames('light big m-bottom-x2', {
      't-center': (!user && !error) || (!user && error)
    })

    return (
      <div className="w-100">
        <div className={wrapperClasses}>Personal Informations</div>
        {!user && !error ? (
          <Loader />
        ) : !user && error ? (
          'ERRORE!!'
        ) : (
          <div className="personal-informations flex flex-grow">
            <div className="item">
              <EditableLabel label="name" fieldValue={user.name} />
            </div>
            <div className="item">
              <EditableLabel label="surname" fieldValue={user.surname} />
            </div>
            <div className="item">
              <EditableLabel label="email" fieldValue={user.email} />
            </div>
            <div className="item item-last">
              <button className="editPassword">EDIT PASSWORD</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.settings.me.data,
  error: state.settings.me.error
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => dispatch(startFetchUserInfo())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationForm)
