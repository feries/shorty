const SecurePassword = require('secure-password')()
const uuidv4 = require('uuid/v4')

const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  const { email, password } = req.body

  const selectUserByEmail = sqlLoader('selectUserByEmail.sql')
  const rows = await db.query(selectUserByEmail, [email])

  if (rows.length !== 0)
    return res.status(400).send({ message: 'Email is in use' })

  const hashedPassword = await SecurePassword.hash(Buffer.from(password))
  const options = [uuidv4(), email, hashedPassword.toString('base64')]

  const insertNewUser = sqlLoader('insertNewUser.sql')
  const { affectedRows } = await db.query(insertNewUser, options)

  if (affectedRows !== 1)
    return res.status(500).send({ message: 'Something went wrong' })

  res.sendStatus(201)
}
