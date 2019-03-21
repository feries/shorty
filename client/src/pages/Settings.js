import React, { Component } from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import ApiKeyList from '../containers/ApiKeyList'
import ErrorEditor from '../containers/ErrorEditor'
import UserList from '../components/UserList'
import PersonalInformationFrom from '../containers/PersonalInformationsForm'
import DeleteApiKeyWithConfirm from '../containers/DeleteApiKeyWithConfirm'
import Toast from '../containers/Toast'

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
            <ErrorEditor
              pageType="404"
              title="Error 404"
              description="Here you can create the extra markup that will be added in the custom box of your 404 Page. It can be useful if you wanna link your users to a dedicated page or define custom behaviours."
              cta="SAVE PAGE 404"
            />
          </div>
          <div className="box m-top-x6">
            <ErrorEditor
              pageType="500"
              title="Error 500"
              description="Here you can create the extra markup that will be added in the custom box of your 500 Page. It can be useful if you wanna link your users to a dedicated page or define custom behaviours."
              cta="SAVE PAGE 500"
            />
          </div>
          <div className="box m-top-x6">
            <UserList
              title="Users"
              description="Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum."
              cta="CREATE NEW USER"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Settings
