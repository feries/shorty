bin
===



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/bin.svg)](https://npmjs.org/package/bin)
[![Downloads/week](https://img.shields.io/npm/dw/bin.svg)](https://npmjs.org/package/bin)
[![License](https://img.shields.io/npm/l/bin.svg)](https://github.com/shorty/bin/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g bin
$ bin COMMAND
running command...
$ bin (-v|--version|version)
bin/0.0.0 darwin-x64 node-v10.15.0
$ bin --help [COMMAND]
USAGE
  $ bin COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`bin hello`](#bin-hello)
* [`bin help [COMMAND]`](#bin-help-command)

## `bin hello`

Describe the command here

```
USAGE
  $ bin hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/bootstrap.js](https://github.com/shorty/bin/blob/v0.0.0/src/commands/hello.js)_

## `bin help [COMMAND]`

display help for bin

```
USAGE
  $ bin help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
