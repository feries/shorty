import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from 'react-responsive-modal'
import { modalCustomStyle } from '../constants/style'
import EditableLabel from '../components/EditableLabel'
import Loader from '../components/Loader'
import PasswordHandler from '../containers/PasswordHandler'
import { startFetchUserInfo } from '../actions/settings'

class PersonalInformationForm extends Component {
  state = { showModal: false }

  static propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
    }),
    error: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    this.props.fetchUserData()
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { user, error } = this.props
    const { showModal } = this.state

    const wrapperClasses = classnames('light big m-bottom-x2', {
      't-center': (!user && !error) || (!user && error),
    })

    const modalClasses = {
      ...modalCustomStyle('big'),
      modal: `${modalCustomStyle('big').modal} vertical-centered`,
    }

    return (
      <div className="w-100">
        <Modal
          open={showModal}
          onClose={this.handleModal}
          center
          classNames={modalClasses}
        >
          <h1>Update password</h1>
          <div>
            <p className="tiny">
              Here you can edit your password. You will receive an email for
              confirmation.
            </p>
            <PasswordHandler
              reset={true}
              cta="Update my password"
              showCtaIcon={false}
            />
          </div>
        </Modal>
        <div className={wrapperClasses}>Personal Information</div>
        {!user && !error ? (
          <Loader />
        ) : !user && error ? (
          'ERRORE!!' // TODO: Replace with an error component
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
              <button className="editPassword" onClick={this.handleModal}>
                EDIT PASSWORD
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.settings.me.data,
  error: state.settings.me.error,
})

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => dispatch(startFetchUserInfo()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformationForm)
