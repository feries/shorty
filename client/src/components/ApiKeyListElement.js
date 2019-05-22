import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import classnames from 'classnames'

import { clearUrl } from '../lib/helpers'

const ApiKeyListElement = ({
  apiKey,
  active,
  author,
  issuer,
  createdAt,
  action
}) => {
  const buttonClasses = classnames({
    disable: active !== 1,
    delete: active === 1
  })
  const rowClasses = classnames('itemList flex flex-space normal', {
    disabled: active !== 1
  })

  return (
    <ul className={rowClasses}>
      <li className="w-50">{apiKey}</li>
      <li className="w-20">{author}</li>
      <li className="w-15">{clearUrl(issuer)}</li>
      <li className="w-10">{dayjs(createdAt).format('DD.MM.YYYY')}</li>
      <li className="w-5 t-right">
        {active === 1 && (
          <button className={buttonClasses} onClick={action}>
            <i className="far fa-minus-circle" />
          </button>
        )}
      </li>
    </ul>
  )
}

ApiKeyListElement.propTypes = {
  apiKey: PropTypes.string.isRequired,
  active: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  issuer: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
}

export default ApiKeyListElement
