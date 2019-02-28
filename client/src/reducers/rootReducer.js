import { combineReducers } from 'redux'

import toast from './toast'
import dashboard from './dashboard'
import login from './login'

export default combineReducers({
  toast,
  login,
  dashboard
})
