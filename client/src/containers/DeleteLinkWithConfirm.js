import React from 'react'
import { connect } from 'react-redux'

import Modal from '../components/Modal'
import withConfirm from '../hocs/withConfirm'
import { startDelete } from '../actions/dashboard'

const ModalWithConfirm = withConfirm(Modal)

const DeleteLinkWithConfirm = ({
  confirmValue,
  confirmAction,
  confirmModal,
  onConfirm,
  onClose
}) => (
  <ModalWithConfirm
    message="Are you sure you want to delete this short link? Once deleted it will no longer be reachable by users."
    open={confirmModal}
    value={confirmValue}
    action={confirmAction}
    onConfirm={() => onConfirm(confirmAction)}
    onDismiss={() => onClose()}
  />
)

const mapDispatchToProps = (dispatch) => ({
  onConfirm: (externalId) => dispatch(startDelete(externalId))
})

export default connect(
  null,
  mapDispatchToProps
)(DeleteLinkWithConfirm)
