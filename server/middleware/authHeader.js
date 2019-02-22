const { authHeaderKey } = require('../constants');
const { sqlLoader } = require('../lib');
const { pool: db } = require('../config');

module.exports = async (req, res, next) => {
  const authHeader = req.get(authHeaderKey);

  if (!authHeader) res.sendStatus(403);

  const sql = sqlLoader('checkAuthorizationKey.sql');
  const query = await db.query(sql, [authHeader]);

  if (query.length === 0) return res.sendStatus(403);

  next();
};
