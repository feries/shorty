const crypto = require('crypto')
const { sqlLoader, isEmail, Nodemailer, generateUuid4 } = require('../../lib')
const { pool: db } = require('../../config')
const { registration } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const { user, body } = req
    const { name, surname, email } = body

    if (!name || !surname || !email || !isEmail(email))
      return res
        .status(422)
        .send({ message: 'Missing parameter for create new user.' })

    const [exist] = await db.query(sqlLoader('selectUserByEmail.sql'), [email])

    if (exist)
      return res.status(400).send({ message: 'User already registered.' })

    const activationToken = await crypto.randomBytes(50).toString('base64')
    const options = [generateUuid4(), email, activationToken]
    const row = await db.query(sqlLoader('insertNewUser.sql'), options)

    if (row.affectedRows !== 1)
      return res.status(500).send({ message: 'Something went wrong' })

    const contacts = await db.query(sqlLoader('insertUserContacts.sql'), [
      email,
      name,
      email,
      surname,
    ])

    if (contacts.affectedRows !== 2)
      return res.status(500).send({ message: 'Something went wrong' })

    const [first, last] = await db.query(
      sqlLoader('getUserDataByExternalId.sql'),
      [user.sub.external_id]
    )

    const mailData = {
      name: `${name} ${surname}`,
      url: process.env.DOMAIN,
      user: `${first.value} ${last.value}`,
      email,
      activationToken,
    }

    const mailer = new Nodemailer()
    const mail = await mailer.send(email, registration, mailData)

    if (!mail || mail instanceof Error)
      return res.status(500).send({ message: 'Something went terribly wrong' })

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send({ message: 'Something went terribly wrong' })
  }
}
