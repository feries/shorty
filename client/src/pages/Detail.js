import React from 'react'

import Logo from '../components/Logo'
import BackToHome from '../components/BackToHome'
import Detail from '../containers/Detail'

const DetailPage = (props) => (
  <div className="container">
    <div id="content" className="content m-top-x4">
      <div className="flex flex-space">
        <Logo className="logosmall" />
        <BackToHome />
      </div>
      <Detail id={props.match.params.id} />
    </div>
  </div>
)

export default DetailPage
