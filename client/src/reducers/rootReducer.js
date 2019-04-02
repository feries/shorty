import { combineReducers } from 'redux'

import toast from './toast'
import dashboard from './dashboard'
import detail from './detail'
import settings from './settings'
import error from './error'

export default combineReducers({
  toast,
  dashboard,
  detail,
  settings,
  error
})
