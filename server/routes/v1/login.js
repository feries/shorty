const securePassword = require('secure-password')
const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')

const { sqlLoader } = require('../../lib')
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
  const match = await SecurePassword.verify(Buffer.from(password), row.password)

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

  const user = { ...row }
  const now = Math.floor(Date.now() / 1000)
  const iat = now - 10
  const jti = `SVC-AUTH/${user.external_id}/${uuidv4()}`
  const token = jwt.sign(
    {
      jti,
      iat,
      sub: user,
      nbf: 3000
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_IN,
      issuer: process.env.JWT_ISSUER
    }
  )

  const refreshToken = jwt.sign(user, process.env.RWT_SECRET, {
    expiresIn: process.env.RWT_EXPIRE_IN,
    issuer: process.env.JWT_ISSUER
  })

  const updateUserRefreshToken = sqlLoader('updateUserRefreshToken.sql')
  await db.query(updateUserRefreshToken, [refreshToken, userId])

  const updateUserLastLogin = sqlLoader('updateUserLastLogin.sql')
  await db.query(updateUserLastLogin, [Date.now(), userId])

  res.send({ token, refreshToken, user })
}
