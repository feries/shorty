import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startDeactivateKey, startFetchApiKeys } from '../actions/settings'
import ApiKeyListElement from '../components/ApiKeyListElement'
import Loader from '../components/Loader'

class ApiKeyList extends Component {
  static propTypes = {
    fetchApiList: PropTypes.func.isRequired,
    deactivateKey: PropTypes.func.isRequired,
    list: PropTypes.shape({
      keys: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          active: PropTypes.number.isRequired,
          author: PropTypes.string.isRequired,
          issuer: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired
        })
      )
    }),
    count: PropTypes.number,
    error: PropTypes.bool
  }

  componentDidMount() {
    this.props.fetchApiList()
  }

  handleDeactivateApiKey = (externalId, issuer) => {
    if (!externalId || !issuer) return

    this.props.deactivateKey(externalId, issuer)
  }

  render() {
    const { list, error } = this.props

    const wrapperClasses = classnames('content m-top-x2', {
      't-center': (!list && !error) || (!list && error)
    })

    return (
      <div className="apiKeyList">
        {!list && !error ? (
          <Loader />
        ) : !list && error ? (
          'ERRORE!!'
        ) : (
          <Fragment>
            <ul className="header bold flex flex-space normal">
              <li className="item w-50">API Key</li>
              <li className="item w-20">Created by</li>
              <li className="item w-15">Issuer</li>
              <li className="item w-10">Creation date</li>
              <li className="item w-5" />
            </ul>
            <div className={wrapperClasses}>
              {list.keys &&
                list.keys.map((el) => (
                  <ApiKeyListElement
                    key={el.key}
                    apiKey={el.key}
                    active={el.active}
                    author={el.author}
                    issuer={el.issuer}
                    createdAt={el.createdAt}
                    action={() =>
                      this.handleDeactivateApiKey(el.externalId, el.issuer)
                    }
                  />
                ))}
            </div>
            <div className="m-top-x2 t-center">
              <button className="cta">ADD NEW API-KEY</button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.settings.keys.data,
  error: state.settings.keys.error
})

const mapDispatchToProps = (dispatch) => ({
  fetchApiList: () => dispatch(startFetchApiKeys()),
  deactivateKey: (externalId) => dispatch(startDeactivateKey(externalId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeyList)
