import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Modal from '../components/Modal'
import UserForm from '../components/UserForm'
import withTitleAndDescription from '../hocs/withTitleAndDescription'

const EnhancedForm = withTitleAndDescription(UserForm)

const AddUserModal = ({ open, register }) => (
  <div id="loginBox">
    <Modal open={open} size="big">
      <EnhancedForm
        title="Add new user"
        description="Add new user able to access and create new short url. Each user be able to add new users."
        register={register}
      />
    </Modal>
  </div>
)
AddUserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  register: () => {}
})

export default connect(
  undefined,
  mapDispatchToProps
)(AddUserModal)
