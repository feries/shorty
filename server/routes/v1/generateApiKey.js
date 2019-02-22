const crypto = require('crypto');
const uuidv4 = require('uuid/v4');

const { sqlLoader } = require('../../lib');
const { pool: db } = require('../../config');

module.exports = async (req, res) => {
  try {
    const { issuer } = req.body;

    if (!issuer) throw new Error('Invalid issuer provided');

    const apiKey = crypto
      .createHash('sha256')
      .update(uuidv4())
      .update(issuer)
      .digest('hex')
      .toString();

    const sql = sqlLoader('insertNewApiKey.sql');
    const { affectedRows } = await db.query(sql, [issuer, apiKey]);

    if (affectedRows !== 1) res.send(500);

    res.status(201).send({ key: apiKey });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).send({ message: 'Invalid issuer' });
    }

    res.sendStatus(500);
  }
};
