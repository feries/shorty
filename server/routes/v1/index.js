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
const insertNewUrl = require('./insertNewUrl')
const apiKey = require('./generateApiKey')

// Authentication middleware
// routerV1.use(unless(authHeader, '/login'))
routerV1.use(
  jwt({
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER
  }).unless({ path: ['/login'] })
)

// Handle user login
routerV1.post('/login', login)

// Handle user signup
routerV1.post('/signup', signup)

// Generate new API-KEY
routerV1.post('/api-key', apiKey)

// Get all shorted urls
routerV1.get('/urls', getAllUrls)

// Add new shorted url
routerV1.post('/urls', insertNewUrl)

// Get specific url
routerV1.get('/urls/:id', getAllUrls)

// Update url stats
routerV1.put('/urls/:id', getAllUrls)

// Delete url
routerV1.delete('/urls/:id', getAllUrls)

module.exports = routerV1
