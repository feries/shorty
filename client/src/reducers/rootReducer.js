import { combineReducers } from 'redux'

import toast from './toast'
import dashboard from './dashboard'
import detail from './detail'
import settings from './settings'
import error from './error'
import user from './user'

export default combineReducers({
  toast,
  dashboard,
  detail,
  settings,
  error,
  user
})
