const express = require('express');
const routerV1 = express.Router();

// Middlewares
const { unless } = require('../lib');
const { authHeader } = require('../middleware');

// V1 routing
const routesV1 = require('./v1');

// Authentication middleware
routerV1.use(unless(authHeader, '/api-key'));

// Generate new API-KEY
routerV1.post('/api-key', routesV1.apiKey);

// Get all shorted urls
routerV1.get('/urls', routesV1.urls);

// Add new shorted url
routerV1.post('/urls', routesV1.urls);

// Get specific url
routerV1.get('/urls/:id', routesV1.urls);

// Update url stats
routerV1.put('/urls/:id', routesV1.urls);

// Delete url
routerV1.delete('/urls/:id', routesV1.urls);

// Exports
module.exports = { routerV1 };
