const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { sqlLoader, generateTokens } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { hash } = req.params
    const { email, newPassword, oldPassword, confirmPassword, reset } = req.body

    if (!reset) {
      if (!hash || !email || !newPassword || !confirmPassword)
        return res.status(400).send({
          message: 'You must provide all required data for activate account.',
        })
    } else {
      if (!email || !newPassword || !oldPassword || !confirmPassword)
        return res.status(400).send({
          message: 'You must provide all required data for activate account.',
        })
    }

    if (newPassword !== confirmPassword)
      return res.status(400).send({
        message: 'Your password fields does not match.',
      })

    const [user] = await db.query(sqlLoader('getUserByActivationToken.sql'), [
      hash,
      email,
    ])

    if (!user && !user.id)
      return res
        .status(400)
        .send({ message: 'Invalid data provide. Check it and try again.' })

    const buffer = await crypto.randomBytes(8)
    const password = buffer
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const query = await db.query(sqlLoader('activateAccount.sql'), [
      hashedPassword,
      user.id,
    ])

    if (query.affectedRows !== 1)
      return res.status(500).send({ message: 'Error while activating user.' })

    const userId = user.id
    delete user.id

    const { token, refreshToken } = generateTokens(user)

    db.query(sqlLoader('updateUserRefreshToken.sql'), [refreshToken, userId])
    db.query(sqlLoader('updateUserLastLogin.sql'), [userId])

    res.status(200).json({ token, refreshToken, user })
  } catch (exception) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
