const SecurePassword = require('secure-password')()
const { sqlLoader, getToken, decodeJwt } = require('../../lib')
const { pool: db } = require('../../config')

module.exports = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const token = getToken(req.get('Authorization'))
    const { external_id: userExternalId } = decodeJwt(token)

    const hashedOldPassword = await SecurePassword.hash(
      Buffer.from(oldPassword)
    )
    const oldPwd = hashedOldPassword.toString('base64')

    const sqlOldPwd = sqlLoader('validateOldPassword.sql')
    const queryOldPwd = await db.query(sqlOldPwd, [userExternalId, oldPwd])

    if (queryOldPwd.length !== 1)
      return res
        .status(400)
        .send({ message: "Your old password isn't correct." })

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
