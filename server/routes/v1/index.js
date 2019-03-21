const express = require('express')
const jwt = require('express-jwt')
const routerV1 = express.Router()

// Middlewares
const { unless } = require('../../lib')
const { authHeader } = require('../../middleware')

// Route controllers
const login = require('./login')
const signup = require('./signup')
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

// Authentication middleware
routerV1.use(unless(authHeader, '/login', '/api/v1/refresh-token'))
routerV1.use(
  jwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER
  }).unless({
    path: ['/api/v1/login', '/api/v1/refresh-token']
  })
)

// AUTH
// Handle user login
routerV1.post('/login', login)

// Handle user signup
routerV1.post('/signup', signup)

// Refresh JWT
routerV1.post('/refresh-token', refreshToken)
// END AUTH

// URLS
// Get all shorted urls
routerV1.get('/urls', getAllUrls)

// Filter Urls
routerV1.get('/urls/filter', getAllUrlsFiltered)

// Add new shorted url
routerV1.post('/urls', insertNewUrl)

// Add new host url
routerV1.post('/urls/host', insertNewHost)

// Get specific url
routerV1.get('/urls/:id/:range?', getUrlDetail)

// Delete url
routerV1.delete('/urls/:id', deleteUrl)
// END URLS

// SETTINGS
// Fetch setting page data
routerV1.get('/settings/user-info', getUserInfo)

// Update user contact
routerV1.post('/settings/user-info', updateContact)
// END SETTINGS

// API-KEY
// Get all API-KEY
routerV1.get('/settings/api-key', getAllApiKeys)

// Generate new API-KEY
routerV1.post('/settings/api-key', apiKey)

// Deactivate API-KEY
routerV1.delete('/settings/api-key/:id', deleteApiKey)
// END API-KEY

// CUSTOM TEMPLATES
// Read Page tempalte if exist
routerV1.get('/settings/error-page/:page', fetchCustomPage)

// Save new tempalte
routerV1.post('/settings/error-page', saveCustomTemplate)
// END CUSTOM TEMPLATES

module.exports = routerV1
