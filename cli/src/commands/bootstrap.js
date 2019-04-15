const { Command, flags } = require('@oclif/command')
const { cli } = require('cli-ux')
const chalk = require('chalk')
const dotenv = require('dotenv')
const got = require('got')

class BootstrapCommand extends Command {
  throwError(message) {
    this.error(chalk.red(message))
    this.exit(1)
  }

  loadDotEnv() {
    cli.action.start('• Loading environment variables')

    dotenv.config({
      path: require('path').resolve(__dirname, '..', '..', '..', '.env')
    })

    const isValid =
      process.env.DOMAIN !== undefined && process.env.DOMAIN !== null

    cli.action.stop(isValid ? chalk.green('done') : chalk.red('fail'))

    if (!isValid)
      return this.throwError(
        'You must provide a valid HTTP address in your env configuration under DOMAIN key.'
      )

    this.domain =
      process.env.NODE_ENV !== 'production'
        ? `http://127.0.0.1:${process.env.SERVER_PORT}`
        : process.env.DOMAIN
  }

  async pingDomain() {
    try {
      if (!this.domain)
        return this.throwError(
          "No domain specified into dontenv config file under DOMAIN key, or it's not loaded correctly."
        )
      cli.action.start('• Attempt to ping the server.')
      const { statusCode, body } = await got(`${this.domain}/ready`)
      const pinged = statusCode === 200 && body === 'SERVER_IS_READY'
      cli.action.stop(pinged ? chalk.green('done') : chalk.red('fail'))

      if (!pinged) return this.throwError('Check if the server is ready.')
    } catch (e) {
      this.error(
        chalk.red('Something went wrong while attempting to ping the server.')
      )
      this.exit(1)
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  async insertName() {
    const name = await cli.prompt('• Insert new user name')
    const confirm = await cli.confirm(
      `• You confirm the user name is: ${chalk.green(name)} [Y/n]`
    )
    if (!confirm) return this.insertName()
    cli.log(chalk.gray('• • User name is: '), chalk.green(name))
    return name
  }

  async insertSurname() {
    const surname = await cli.prompt('• Insert new user surname')
    const confirm = await cli.confirm(
      `• You confirm the user surname is: ${chalk.green(surname)} [Y/n]`
    )
    if (!confirm) return this.insertSurname()
    cli.log(chalk.gray('• • User surname is: '), chalk.green(surname))
    return surname
  }

  async insertEmail() {
    const email = await cli.prompt('• Insert new user email')

    if (!this.validateEmail(email)) {
      cli.log('• • ', chalk.gray(email), chalk.red(`is not a valid format.`))
      return this.userObject()
    }

    const confirm = await cli.confirm(
      `• You confirm the user surname is: ${chalk.green(email)} [Y/n]`
    )
    if (!confirm) return this.insertEmail()
    cli.log(chalk.gray('• • User email is: '), chalk.green(email))
    return email
  }

  async userObject() {
    let created = false
    let name = await this.insertName()
    let surname = await this.insertSurname()
    let email = await this.insertEmail()

    cli.action.stop(created ? chalk.green('done') : chalk.red('fail'))
  }

  async generateUser() {
    cli.action.start('• Starting user generation.')
    cli.wait(5000)
    await this.loadDotEnv()
    await this.pingDomain()
    await this.userObject()
    cli.action.stop(chalk.green('done'))
  }

  async run() {
    const { flags } = this.parse(BootstrapCommand)
    if ('add-user' in flags) await this.generateUser()
  }
}

BootstrapCommand.description = `This script is an helper for build initial configuration of Shorty 
...
Extra documentation goes here
`

BootstrapCommand.flags = {
  bootstrap: flags.boolean({
    char: 'b',
    description: 'Generate full bootstrap.'
  }),
  'add-user': flags.boolean({ char: 'u', description: 'Add an user' })
}

module.exports = BootstrapCommand
