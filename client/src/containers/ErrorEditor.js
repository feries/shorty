import React from 'react'
import { connect } from 'react-redux'

import Editor from '../components/Editor'
import { startFetchCustomMds, startSaveCustomMd } from '../actions/settings'

const mapStateToProps = (state) => ({
  page404: state.settings.pages['404'],
  page500: state.settings.pages['500']
})

const mapDispatchToProps = (dispatch) => ({
  save: (md, page) => dispatch(startSaveCustomMd(md, page)),
  fetch: (page) => dispatch(startFetchCustomMds(page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
