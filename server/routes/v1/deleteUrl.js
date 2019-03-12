const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(400).send({ message: 'What do you want delete?' })

    const sql = sqlLoader('deleteUrl.sql')
    const rows = await db.query(sql, [id])

    if (rows.affectedRows !== 1)
      return res.status(500).send({ message: 'Terrible implementation' })

    res.sendStatus(200)
  } catch (e) {
    res.status(500).send({ message: 'Terrible implementation' })
  }
}
