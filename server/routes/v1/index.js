const express = require('express')
const jwt = require('express-jwt')
const routerV1 = express.Router()

// Middlewares
const { unless } = require('../../lib')
const { authHeader } = require('../../middleware')

// Route controllers
const login = require('./login')
const getAllUrls = require('./getAllUrls')
const getAllUrlsFiltered = require('./getAllUrlsFiltered')
const insertNewUrl = require('./insertNewUrl')
const insertNewHost = require('./insertNewHost')
const deleteUrl = require('./deleteUrl')
const apiKey = require('./generateApiKey')
const getUrlDetail = require('./getUrlDetail')
const refreshToken = require('./refreshToken')
const updateContact = require('./updateContact')
const deleteApiKey = require('./deleteApiKey')
const getAllApiKeys = require('./getAllApiKeys')
const getUserInfo = require('./getUserInfo')
const saveCustomTemplate = require('./saveCustomTemplate')
const fetchCustomPage = require('./fetchCustomPage')
const fetchUsers = require('./fetchUsers')
const deactivateUser = require('./deactivateUser')
const insertNewUser = require('./insertNewUser')
const validateHash = require('./validateHash')
const activateAccount = require('./activateAccount')
const updatePassword = require('./updatePassword')
const getMe = require('./getMe')

// Authentication middleware
routerV1.use(
  unless(
    authHeader,
    '/login',
    '/refresh-token',
    '/validate/:hash',
    '/activate/:hash',
    '/settings/error-page/:what'
  )
)
routerV1.use(
  jwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER
  }).unless({
    path: [
      '/api/v1/login',
      '/api/v1/refresh-token',
      /^\/api\/v1\/(validate|activate)\/.*/,
      /^\/api\/v1\/settings\/error-page\/(404|500)/
    ]
  })
)

routerV1.post('/login', login)
routerV1.post('/refresh-token', refreshToken)
routerV1.get('/urls', getAllUrls)
routerV1.get('/urls/filter', getAllUrlsFiltered)
routerV1.post('/urls', insertNewUrl)
routerV1.post('/urls/host', insertNewHost)
routerV1.get('/urls/:id/:range?', getUrlDetail)
routerV1.delete('/urls/:id', deleteUrl)
routerV1.get('/settings/user-info', getUserInfo)
routerV1.post('/settings/user-info', updateContact)
routerV1.get('/settings/api-key', getAllApiKeys)
routerV1.post('/settings/api-key', apiKey)
routerV1.delete('/settings/api-key/:id', deleteApiKey)
routerV1.get('/settings/error-page/:page', fetchCustomPage)
routerV1.post('/settings/error-page', saveCustomTemplate)
routerV1.get('/settings/users', fetchUsers)
routerV1.delete('/settings/users/:id', deactivateUser)
routerV1.post('/settings/users', insertNewUser)
routerV1.post('/settings/user/password', updatePassword)
routerV1.get('/validate/:hash', validateHash)
routerV1.post('/activate/:hash', activateAccount)
routerV1.get('/me', getMe)

module.exports = routerV1
