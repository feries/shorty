require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env')})

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const Sentry = require('@sentry/node')

// Import Routes
const { routerV1, hintTarget } = require('./routes/index')

const HOST = process.env.HOST
const PORT = process.env.PORT
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
app.use('/api/v1', routerV1)
app.get('/:shortid', hintTarget)

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
