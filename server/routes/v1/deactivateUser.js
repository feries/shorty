const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { id } = req.params

    if (!id)
      return res
        .status(400)
        .send({ message: 'What user do you want deactivate?' })

    const sql = sqlLoader('deactivateUser.sql')
    const rows = await db.query(sql, [id])

    if (rows.affectedRows !== 1)
      return res.status(500).send({ message: 'Terrible implementation' })

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
