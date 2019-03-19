import { combineReducers } from 'redux'

import toast from './toast'
import dashboard from './dashboard'
import login from './login'
import detail from './detail'
import settings from './settings'

export default combineReducers({
  toast,
  login,
  dashboard,
  detail,
  settings
})
