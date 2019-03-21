const fs = require('fs')
const { customPages } = require('../../constants')

module.exports = async (req, res) => {
  try {
    const { md, page } = req.body

    if (!md || !page || !customPages.has(page))
      return res.status(422).send({
        type: 'error',
        message: 'You must provide the markup and the target page.'
      })

    const path = process.env.SERVER_PUBLIC_PATH
    const pageName = customPages.get(page)

    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })

    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
    const filePath = `${normalizedPath}/${pageName}.md`

    fs.writeFileSync(filePath, md, 'utf8')

    res.status(200).send({ success: true })
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong.' })
  }
}
