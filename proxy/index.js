require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '.env')
})

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const Sentry = require('@sentry/node')

const hintTarget = require('./routes/hintTarget')

const HOST = process.env.PROXY_HOST
const PORT = process.env.PROXY_PORT
const STATIC_PATH = process.env.STATIC_PATH

const isProd = process.env.NODE_ENV !== 'development'
const app = express()

// Sentry Initialization
isProd &&
  Sentry.init({
    dsn: process.env.SENTRY_URL_SHORTNER_DNS,
    maxBreadcrumbs: 50
  })

// Middlewares
isProd && app.use(Sentry.Handlers.requestHandler())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + STATIC_PATH))
app.use(compression())

// Security settings
app.use(helmet())
app.disable('x-powered-by')

// Map Routes
app.get('/:shortid', hintTarget)

// Default case for unmatched routes
app.use((req, res) => {
  // Invalid request
  if (!isProd) return res.redirect('http://localhost:3000/404')
  res.redirect(`${process.env.DOMAIN}/404`)
})

// Global Error handler
isProd && app.use(Sentry.Handlers.errorHandler())
app.use(function onError(err, req, res) {
  if (!isProd) return

  res.statusCode = 500
  res.end(res.sentry + '\n')
})

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on: http://${HOST}:${PORT}/`)
})
