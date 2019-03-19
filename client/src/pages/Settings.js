import React, { Component } from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import ApiKeyList from '../components/ApiKeyList'
import Editor from '../components/Editor'
import UserList from '../components/UserList'
import PersonalInformationsFrom from '../containers/PersonalInformationsForm'

class Settings extends Component {
  render() {
    return (
      <div className="container">
        <div id="content" className="content m-top-x4">
          <div className="flex flex-space">
            <Logo className="logosmall" />
            <BackToHome />
          </div>
          <div className="settings box flex m-top-x4">
            <PersonalInformationsFrom />
          </div>
          <div className="box m-top-x6">
            <ApiKeyList />
          </div>
          <div className="box m-top-x6">
            <Editor
              title="Error 404"
              description="Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum."
              cta="SAVE PAGE 404"
            />
          </div>
          <div className="box m-top-x6">
            <Editor
              title="Error 500"
              description="Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum."
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
