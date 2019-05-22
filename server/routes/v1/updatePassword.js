const securePassword = require('secure-password')
const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

const SecurePassword = securePassword()

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const token = getToken(req.get('Authorization'))
    const { external_id: userExternalId } = decodeJwt(token)

    if (!oldPassword || !newPassword || !confirmPassword)
      return res
        .status(400)
        .send({ message: 'You must provide all required fields' })

    if (oldPassword === newPassword)
      return res
        .status(400)
        .send({ message: "New password can't be the same of old password." })

    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .send({ message: "New password and confirm password doesn't  match" })

    const oldPwdSql = sqlLoader('getPasswordHashFromUserExternalId.sql')
    const [user] = await db.query(oldPwdSql, [userExternalId])

    if (!user || !user.password)
      return res.status(400).send({
        message: "Old password isn't correct. Please verify it and try again."
      })

    const match = await SecurePassword.verify(
      Buffer.from(oldPassword),
      Buffer.from(user.password, 'base64')
    )

    if (match === securePassword.INVALID_UNRECOGNIZED_HASH)
      return res.status(500).send({ message: 'Something went wrong.' })
    else if (match === securePassword.INVALID)
      return res.status(400).send({
        message:
          "Unable to update your password. Provided old password isn't correct. Please try again."
      })

    const hashedPassword = await SecurePassword.hash(Buffer.from(newPassword))
    const pwd = hashedPassword.toString('base64')

    const sql = sqlLoader('updatePassword.sql')
    const query = await db.query(sql, [pwd, userExternalId])

    if (query.affectedRows !== 1)
      res.status(500).send({ message: 'Something went terribly wrong' })

    res.status(200).send({ message: 'Password successfully updated.' })
  } catch (exception) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
