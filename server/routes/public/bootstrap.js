const crypto = require('crypto')
const uuidv4 = require('uuid')
const { sqlLoader, isEmail, Nodemailer } = require('../../lib')
const { pool: db } = require('../../config')
const { registration } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const security = req.get(process.env.CLI_SECURITY)

    if (!security || security !== process.env.SECURITY_KEY)
      res.status(401).send({ message: 'Unauthorized.' })

    const {
      body: { name, surname, email }
    } = req

    if (!name || !surname || (!email || !isEmail(email)))
      return res
        .status(422)
        .send({ message: 'Missing parameter for create new user.' })

    const selectUserByEmail = sqlLoader('selectUserByEmail.sql')
    const [exist] = await db.query(selectUserByEmail, [email])

    if (exist)
      return res.status(400).send({ message: 'User already registered.' })

    const activationToken = await crypto.randomBytes(50).toString('base64')
    const options = [uuidv4(), email, activationToken]

    const insertNewUser = sqlLoader('insertNewUser.sql')
    const row = await db.query(insertNewUser, options)

    if (row.affectedRows !== 1)
      return res.status(500).send({ message: 'Something went wrong' })

    const insertUserContacts = sqlLoader('insertUserContacts.sql')
    const contacts = await db.query(insertUserContacts, [
      email,
      name,
      email,
      surname
    ])

    if (contacts.affectedRows !== 2)
      return res.status(500).send({ message: 'Something went wrong' })

    const mailData = {
      name: `${name} ${surname}`,
      url: process.env.DOMAIN,
      user: `Admin`,
      email,
      activationToken
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
