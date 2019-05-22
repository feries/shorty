const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env')
})

const express = require('express')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

app.use(compression())
app.use(express.static(path.join(__dirname, process.env.CLIENT_BUILD)))

// Security settings
app.use(helmet())
app.disable('x-powered-by')

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, process.env.CLIENT_BUILD, 'index.html'))
})

app.listen(process.env.CLIENT_PORT)
