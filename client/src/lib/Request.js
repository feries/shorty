import axios from 'axios'
import Auth from './Authentication'

import { BASE_URL } from '../constants/endpoint'

export default class Request {
  constructor() {
    this._instance = axios.create({
      baseURL: BASE_URL,
      timeout: 1000
    })
  }

  getInstance() {
    this.checkAndSetAuth()
    return this._instance
  }

  checkAndSetAuth() {
    this._instance.defaults.headers.common[
      'Authorization'
    ] = Auth.getAuthenticationHeader()
  }
}
