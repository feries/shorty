import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from 'react-responsive-modal'
import { modalCustomStyle } from '../constants/style'

import {
  startAddNewApiKey,
  startDeactivateKey,
  startFetchApiKeys,
} from '../actions/settings'
import ApiKeyListElement from '../components/ApiKeyListElement'
import Loader from '../components/Loader'

class ApiKeyList extends Component {
  state = { showAddKey: false, newApiKeyFor: '' }
  static propTypes = {
    fetchApiList: PropTypes.func.isRequired,
    deactivateKey: PropTypes.func.isRequired,
    saveApiKey: PropTypes.func.isRequired,
    list: PropTypes.shape({
      keys: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          active: PropTypes.number.isRequired,
          author: PropTypes.string.isRequired,
          issuer: PropTypes.string.isRequired,
          createdAt: PropTypes.string.isRequired,
        })
      ),
    }),
    count: PropTypes.number,
    error: PropTypes.bool,
  }

  componentDidMount() {
    this.props.fetchApiList()
  }

  handleDeactivateApiKey = (externalId, issuer) => {
    if (!externalId || !issuer) return

    this.props.deactivateKey(externalId, issuer)
  }

  toggleState = (what, value) => {
    const newValue = !value ? !this.state[what] : value
    this.setState({ [what]: newValue })
  }

  handleAddApiKey = (e) => {
    e.preventDefault()
    const { newApiKeyFor } = this.state

    if (!newApiKeyFor) return

    this.props.saveApiKey(newApiKeyFor).then(() => {
      this.setState({ newApiKeyFor: '', showAddKey: false })
    })
  }

  render() {
    const { showAddKey, newApiKeyFor } = this.state
    const { list, error } = this.props

    const wrapperClasses = classnames('content m-top-x2', {
      't-center': (!list && !error) || (!list && error),
    })

    return (
      <div className="apiKeyList">
        {!list && !error ? (
          <Loader />
        ) : !list && error ? (
          'ERRORE!!'
        ) : (
          <Fragment>
            <Modal
              open={showAddKey}
              onClose={() => this.toggleState('showAddKey')}
              center
              classNames={modalCustomStyle('big')}
            >
              <h1>Add new API-KEY</h1>
              <p className="tiny">
                The added key will be able to perform all available operations
                exposed via API from Shorty.
              </p>
              <form className="t-center">
                <input
                  type="text"
                  value={newApiKeyFor}
                  placeholder="Insert here the new provider."
                  onChange={(e) =>
                    this.toggleState('newApiKeyFor', e.target.value)
                  }
                  autoFocus={true}
                  className="w-100"
                />
                <button
                  className="button button-primary normal uppercase m-top-x2"
                  disabled={newApiKeyFor.length === 0}
                  onClick={this.handleAddApiKey}
                >
                  Generate new API-KEY
                </button>
              </form>
            </Modal>
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
              <button
                className="cta"
                onClick={() => this.toggleState('showAddKey')}
              >
                ADD NEW API-KEY
              </button>
            </div>
          </Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.settings.keys.data,
  error: state.settings.keys.error,
})

const mapDispatchToProps = (dispatch) => ({
  fetchApiList: () => dispatch(startFetchApiKeys()),
  deactivateKey: (externalId) => dispatch(startDeactivateKey(externalId)),
  saveApiKey: (issuer) => dispatch(startAddNewApiKey(issuer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApiKeyList)
