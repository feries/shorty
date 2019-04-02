import React from 'react'
import CustomMarkup from '../containers/CustomMarkup'
export default () => (
  <div className="t-center lightDark">
    <div className="m-top-x4">
      <div className="extraBig bold lightDark">500</div>
      <div className="doubleBig bold">Internal Server Error</div>
      <div className="large">Something went wrong, try again later!</div>
    </div>
    <div>
      <div className="normal m-top-x10 m-bottom">
        Maybe what you were looking for is on
      </div>
      <div>
        <a
          href="https://www.agriturismo.it/"
          target="_blank"
          title="agriturismo.it"
          rel="noopener noreferrer"
        >
          <img src="./img/agri.svg" alt="agriturismo.it" />
        </a>

        <a
          href="https://www.casevacanza.it/"
          target="_blank"
          title="casevacanza.it"
          rel="noopener noreferrer"
        >
          <img src="./img/casevacanza.svg" alt="casevacanza.it" />
        </a>
      </div>
    </div>
    <CustomMarkup what="500" />
    <div className="m-top-x10">
      <a
        href="https://www.feries.it/"
        target="_blank"
        title="feries.it"
        rel="noopener noreferrer"
      >
        <img src="./img/logoFeries.svg" alt="feries.it" />
      </a>
    </div>
  </div>
)
