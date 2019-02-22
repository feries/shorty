const fs = require('fs');
const path = require('path');

/**
 * @name sqlLoader
 * @description Load SQL script from `sql` directory in root
 * @returns {String} Read query
 */
const sqlLoader = file =>
  fs.readFileSync(path.join(__dirname, '..', 'sql', file), 'utf8');

module.exports = sqlLoader;
