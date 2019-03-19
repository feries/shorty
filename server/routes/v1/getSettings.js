const { sqlLoader } = require('../../lib')
const { pool: db } = require('../../config')
const getUserInfo = require('./getUserInfo')

module.exports = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).send({ message: 'Terrible implementation' })
  }
}
