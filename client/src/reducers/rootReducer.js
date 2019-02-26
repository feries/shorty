import { combineReducers } from 'redux'
import dashboard from './dashboard'
import login from './login'

export default combineReducers({
  login,
  dashboard
})
