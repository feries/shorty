import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModalWithConfirm from '../components/ModalWithConfirm'
import { startDeactivateKey } from '../actions/settings'

const DeleteApiKeyWithConfirm = ({ value, issuer, onConfirm, onDismiss }) => (
  <ModalWithConfirm
    message={`Are you sure you want to delete this API-KEY? Once it's deleted it will no longer be used by ${issuer}.`}
    open={value !== null}
    onConfirm={() => onConfirm(value).then(() => onDismiss())}
    onDismiss={() => onDismiss()}
    size="normal"
  />
)

DeleteApiKeyWithConfirm.propTypes = {
  value: PropTypes.string,
  issuer: PropTypes.string,
  onDismiss: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  onConfirm: (externalId) => dispatch(startDeactivateKey(externalId)),
})

export default connect(undefined, mapDispatchToProps)(DeleteApiKeyWithConfirm)
