const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const Sentry = require('@sentry/node')

const hintTarget = require('./routes/hintTarget')
const { PROXY_HOST, PROXY_PORT, NODE_ENV } = process.env

const isProd = NODE_ENV !== 'development'
const app = express()

// Sentry Initialization
isProd &&
  Sentry.init({
    dsn: process.env.SENTRY_URL_SHORTNER_DNS,
    maxBreadcrumbs: 50,
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
app.get('/:shortid', hintTarget)

// Default case for unmatched routes
app.use((_, res) => {
  // Invalid request
  if (!isProd) return res.redirect('http://localhost:3000/404')
  res.redirect(`${process.env.DOMAIN}/404`)
})

// Global Error handler
isProd && app.use(Sentry.Handlers.errorHandler())
app.use(function onError(_, _, res) {
  if (!isProd) return

  res.statusCode = 500
  res.end(res.sentry + '\n')
})

// Start server
app.listen(PROXY_PORT, PROXY_HOST, () => {
  console.log(`Server is running on: http://${PROXY_HOST}:${PROXY_PORT}/`)
})
