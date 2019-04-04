const securePassword = require('secure-password')

const { sqlLoader, generateTokens } = require('../../lib')
const { pool: db } = require('../../config')

const SecurePassword = securePassword()

module.exports = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res
      .status(400)
      .send({ message: 'You must provide login credentials' })

  const sql = sqlLoader('login.sql')
  const rows = await db.query(sql, [email])

  if (rows.length === 0 || rows.length > 1)
    return res.status(401).send({ message: 'Invalid credentials' })

  const row = rows[0]

  const match = await SecurePassword.verify(
    Buffer.from(password),
    Buffer.from(row.password, 'base64')
  )

  if (match === securePassword.INVALID_UNRECOGNIZED_HASH)
    return res.status(401).send({ message: 'Invalid credentials' })
  else if (match === securePassword.INVALID)
    return res.status(401).send({ message: 'Invalid credentials' })
  else if (match === securePassword.VALID_NEEDS_REHASH) {
    const hashedPassword = await SecurePassword.hash(Buffer.from(password))
    const updateUserPassword = sqlLoader('updateUserPassword.sql')
    await db.query(updateUserPassword, [hashedPassword, row.id])
  }

  const userId = row.id

  delete row.password
  delete row.id
  delete row.account_enabled
  delete row.refresh_token
  delete row.activation_token

  const user = { ...row }
  const { token, refreshToken, expiresIn } = generateTokens(user)

  const updateUserRefreshToken = sqlLoader('updateUserRefreshToken.sql')
  await db.query(updateUserRefreshToken, [refreshToken, userId])

  const updateUserLastLogin = sqlLoader('updateUserLastLogin.sql')
  await db.query(updateUserLastLogin, [userId])

  res.send({ token, refreshToken, expiresIn, user })
}
