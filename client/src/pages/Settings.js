import React, { Component } from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import ApiKeyList from '../containers/ApiKeyList'
import ErrorEditor from '../containers/ErrorEditor'
import UserList from '../containers/UserList'
import PersonalInformationFrom from '../containers/PersonalInformationsForm'
import DeleteApiKeyWithConfirm from '../containers/DeleteApiKeyWithConfirm'
import Toast from '../containers/Toast'

import withTitleAndDescription from '../hocs/withTitleAndDescription'

const EnhancedUserList = withTitleAndDescription(UserList)
const EnhancedEditor = withTitleAndDescription(ErrorEditor)

class Settings extends Component {
  state = { apiKey: null, apiKeyIssuer: '' }

  deleteApiKey = (externalId, issuer) => {
    if (!externalId || !issuer) return
    this.setState({ apiKey: externalId })
  }

  render() {
    const { apiKey, apiKeyIssuer } = this.state

    return (
      <div className="container">
        <Toast />
        <DeleteApiKeyWithConfirm
          value={apiKey}
          issuer={apiKeyIssuer}
          onDismiss={() => this.deleteApiKey(null, '')}
        />
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <div className="settings box flex m-top-x4">
            <PersonalInformationFrom />
          </div>
          <div className="box m-top-x6">
            <ApiKeyList
              deactivateKey={(externalId, issuer) =>
                this.deleteApiKey(externalId, issuer)
              }
            />
          </div>
          <div className="box m-top-x6">
            <div className="userList">
              <EnhancedEditor
                pageType="404"
                title="Error 404"
                description="Here you can create the extra markup that will be added in the custom box of your 404 Page. It can be useful if you wanna link your users to a dedicated page or define custom behaviours."
                cta="SAVE PAGE 404"
              />
            </div>
          </div>
          <div className="box m-top-x6">
            <div className="userList">
              <EnhancedEditor
                pageType="500"
                title="Error 500"
                description="Here you can create the extra markup that will be added in the custom box of your 500 Page. It can be useful if you wanna link your users to a dedicated page or define custom behaviours."
                cta="SAVE PAGE 500"
              />
            </div>
          </div>
          <div className="box m-top-x6">
            <div className="userList">
              <EnhancedUserList
                title="Users"
                description="Here you can handle active user, and disable not active more users."
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
