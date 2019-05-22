import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as Showdown from 'showdown'

import Loader from '../components/Loader'
import { fetchCustomErrorMarkup } from '../actions/error'

class CustomMarkup extends Component {
  static propTypes = {
    what: PropTypes.oneOf(['404', '500']).isRequired,
    fetch: PropTypes.func.isRequired,
    customError: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      markdown: PropTypes.string
    }).isRequired
  }

  constructor(props) {
    super(props)
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    })
  }

  componentDidMount() {
    this.props.fetch(this.props.what)
  }

  render() {
    const {
      customError: { loading, markdown }
    } = this.props

    if (loading) return <Loader />

    return (
      <div
        className="custom-markup__wrapper"
        dangerouslySetInnerHTML={{ __html: this.converter.makeHtml(markdown) }}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  customError: state.error.customError
})

const mapDispatchToProps = (dispatch) => ({
  fetch: (what) => dispatch(fetchCustomErrorMarkup(what))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMarkup)
