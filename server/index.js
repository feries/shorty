require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '.env')
})

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const Sentry = require('@sentry/node')

const {
  NODE_ENV,
  SERVER_HOST,
  SERVER_PORT,
  SENTRY_URL_SHORTENER_SERVER_DNS
} = process.env

const isProd = NODE_ENV === 'production'

const app = express()

// Import router
const { routerV1 } = require('./routes/index')

// Sentry Initialization
isProd &&
  Sentry.init({
    dsn: SENTRY_URL_SHORTENER_SERVER_DNS,
    maxBreadcrumbs: 50
  })

// Middlewares
isProd && app.use(Sentry.Handlers.requestHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compression())

// Security settings
app.use(helmet())
app.disable('x-powered-by')

// Map Routes
app.use('/api/v1', routerV1)

// Global Error handler
isProd && app.use(Sentry.Handlers.errorHandler())
app.use(function onError(err, req, res) {
  if (!isProd) return

  res.statusCode = 500
  res.end(res.sentry + '\n')
})

// Start server
app.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server is running on: http://${SERVER_HOST}:${SERVER_PORT}/`)
})
