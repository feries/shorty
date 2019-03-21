const fs = require('fs')
const { customPages } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const { page } = req.params

    if (!page || !customPages.has(page))
      return res.status(422).send({
        type: 'error',
        message: 'You must provide the requested page.'
      })

    const path = process.env.SERVER_PUBLIC_PATH
    const pageName = customPages.get(page)
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
    const filePath = `${normalizedPath}/${pageName}.md`

    let data = ''

    if (fs.existsSync(filePath)) data = fs.readFileSync(filePath, 'utf8')

    res.status(200).send({ data })
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' })
  }
}
