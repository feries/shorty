import axios from 'axios'
import Auth from './Authentication'

class Request {
  constructor() {
    this._instance = axios.create({
      baseURL: 'http://127.0.0.1:3001/',
      timeout: 1000
    })
  }

  get instance() {
    return this._instance
  }

  checkAndSetAuth() {
    this._instance.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
  }
}
