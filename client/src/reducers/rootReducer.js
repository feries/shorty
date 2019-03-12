import { combineReducers } from 'redux'

import toast from './toast'
import dashboard from './dashboard'
import login from './login'
import detail from './detail'

export default combineReducers({
  toast,
  login,
  dashboard,
  detail
})
