import React from 'react'
import PasswordHandler from '../containers/PasswordHandler'
import Toast from '../containers/Toast'
import Logo from '../components/Logo'

export default (props) => (
  <div className="t-center lightDark">
    <Logo />
    <Toast />
    <PasswordHandler reset={false} hash={props.match.params.id} />
    <div className="m-top-x10">
      <a
        href="https://www.feries.it/"
        target="_blank"
        title="feries.it"
        rel="noopener noreferrer"
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/logoFeries.svg`}
          alt="feries.it"
        />
      </a>
    </div>
  </div>
)
