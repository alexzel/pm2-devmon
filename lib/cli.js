'use strict'

process.env.PM2_NO_INTERACTION = 'true'
process.env.PM2_DISCRETE_MODE = true

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const start = require('./start')

/* eslint-disable no-unused-expressions */
yargs(hideBin(process.argv))
  .version()
  .alias('v', 'version')

  .scriptName('pm2-devmon')
  .usage('Usage: $0 start <cmd> [options]')

  .command('start <cmd> [-r] [-e name] [-i files] [-x extensions] [-d delay]', 'Start PM2 development monitor', yargs =>
    yargs
      .positional('cmd', {
        describe: 'PM2 config file or application script or shell command',
        type: 'string'
      })
      .option('r', {
        alias: 'raw',
        describe: 'Raw output',
        type: 'boolean',
        default: false
      })
      .option('e', {
        alias: 'env',
        describe: 'Environment name from env_[name]',
        type: 'string',
        default: ''
      })
      .option('i', {
        alias: 'ignore',
        describe: 'Files list to ignore watching',
        type: 'array',
        default: []
      })
      .option('x', {
        alias: 'ext',
        describe: 'Comma separated list of file extensions',
        type: 'string',
        default: ''
      })
      .option('d', {
        alias: 'delay',
        describe: 'Restart delay',
        type: 'number',
        default: 2500
      })
  , start)

  .demandCommand()
  .recommendCommands()
  .strict()
  .help()
  .alias('h', 'help')
  .argv
