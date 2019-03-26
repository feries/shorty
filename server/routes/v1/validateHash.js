const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { hash } = req.params

    if (!hash)
      return res
        .status(400)
        .send({ message: 'You must provide an hash for activation' })

    const sql = sqlLoader('checkActivationToken.sql')
    const [rows] = await db.query(sql, [hash])

    if (rows.count !== 1)
      return res.status(400).send({ message: 'Invalid hash' })

    res.status(200).send(true)
  } catch (exception) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
