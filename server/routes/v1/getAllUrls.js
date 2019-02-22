const { queryLimit } = require('../../constants');

/**
 * @method GET
 * @name getAllUrls
 * @description Fetch stored shorted urls
 * @path /api/v1/urls
 * @query {Number} limit - Optional limit to get default 10
 * @query {Number} skip  - Optional fields to skip default 0
 * @body {Empty}
 * @returns All shorted urls with pagination
 */

module.exports = (req, res) => {
  const limit = req.query.limit || queryLimit;
  const skip = req.query.limit && req.query.skip ? req.query.skip : 0;

  
};
