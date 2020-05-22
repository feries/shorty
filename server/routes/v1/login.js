const bcrypt = require('bcryptjs')

const { sqlLoader, generateTokens } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res
      .status(400)
      .send({ message: 'You must provide login credentials' })

  const [user] = await db.query(sqlLoader('login.sql'), [email])

  if (!user) return res.status(401).send({ message: 'Invalid credentials' })

  const match = bcrypt.compareSync(password, user.password)

  if (!match) return res.status(401).send({ message: 'Invalid credentials' })

  const userId = user.id

  delete user.password
  delete user.id
  delete user.account_enabled
  delete user.refresh_token
  delete user.activation_token

  const { token, refreshToken, expiresIn } = generateTokens(user)

  await db.query(sqlLoader('updateUserRefreshToken.sql'), [
    refreshToken,
    userId,
  ])
  await db.query(sqlLoader('updateUserLastLogin.sql'), [userId])

  res.send({ token, refreshToken, expiresIn, user })
}
