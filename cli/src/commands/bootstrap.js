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

  loadSecurityKey() {
    cli.action.start('• Loading security keys')
    const key =
      process.env.CLI_SECURITY !== undefined &&
      process.env.CLI_SECURITY !== null
    const value =
      process.env.SECURITY_KEY !== undefined &&
      process.env.SECURITY_KEY !== null

    const isValid = key && value
    cli.action.stop(isValid ? chalk.green('done') : chalk.red('fail'))

    if (!isValid)
      this.throwError(
        'You must setup a valid CLI_SECURITY and SECURITY_KEY keys into dotenv configuration.'
      )

    this.securityKey = process.env.CLI_SECURITY
    this.securityKeyValue = process.env.SECURITY_KEY
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

    this.loadSecurityKey()
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

  async insertUserData(name, surname, email) {
    try {
      cli.action.start('• Sending user data')
      const body = { name, surname, email }
      const headers = { [this.securityKey]: this.securityKeyValue }
      const { statusCode } = await got.post(`${this.domain}/bootstrap`, {
        throwHttpErrors: false,
        json: true,
        body,
        headers
      })

      const created = statusCode === 201
      cli.action.stop(created ? chalk.green('done') : chalk.red('fail'))

      if (!created) return this.throwError('Unexpected error.')
    } catch (exception) {
      if (exception.statusCode === 201) {
        cli.action.stop(chalk.green('done'))
        return
      }

      const message = exception.message || 'Unexpected error.'
      cli.action.stop(chalk.red('fail'))
      this.throwError(message)
    }
  }

  async userObject() {
    cli.log(chalk.blue('• Fill user information'))
    const name = await this.insertName()
    const surname = await this.insertSurname()
    const email = await this.insertEmail()
    await this.insertUserData(name, surname, email)

    cli.log(
      chalk.green(
        '• User successfully created. An email for first access was sent to the user.'
      )
    )
    this.exit(0)
  }

  async generateUser() {
    cli.log('• Starting user generation.')
    cli.wait(5000)
    await this.loadDotEnv()
    cli.wait(5000)
    await this.pingDomain()
    cli.wait(5000)
    await this.userObject()
    cli.wait(5000)
    cli.log(chalk.green('User successfully created'))
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
