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

// Authentication middleware
routerV1.use(unless(authHeader, '/login'))
routerV1.use(
  jwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER
  }).unless({ path: ['/api/v1/login'] })
)

// Handle user login
routerV1.post('/login', login)

// Handle user signup
routerV1.post('/signup', signup)

// Generate new API-KEY
routerV1.post('/api-key', apiKey)

// Get all shorted urls
routerV1.get('/urls', getAllUrls)

// Filter Urls
routerV1.get('/urls/filter', getAllUrlsFiltered)

// Add new shorted url
routerV1.post('/urls', insertNewUrl)

// Add new host url
routerV1.post('/urls/host', insertNewHost)

// Get specific url
routerV1.get('/urls/:id', getAllUrls)

// Delete url
routerV1.delete('/urls/:id', deleteUrl)

module.exports = routerV1
