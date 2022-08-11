'use strict'

process.env.PM2_NO_INTERACTION = 'true'
process.env.PM2_DISCRETE_MODE = true

const { custom: PM2 } = require('pm2')
const Log = require('pm2/lib/API/Log')

const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

const log = (...msg) =>
  console.log('\x1b[32m%s\x1b[0m', ...msg)

/* eslint-disable no-unused-expressions */
yargs(hideBin(process.argv))
  .version()
  .alias('v', 'version')

  .scriptName('pm2-devmon')
  .usage('Usage: $0 start <file> [options]')

  .command('start <file> [-r] [-i files] [-e name]', 'Start PM2 development monitor', yargs =>
    yargs
      .positional('file', {
        describe: 'PM2 config file or application script',
        type: 'string'
      })
      .option('e', {
        alias: 'env',
        describe: 'Environment name from env_[name] field',
        type: 'string',
        default: ''
      })
      .option('r', {
        alias: 'raw',
        describe: 'Raw output',
        type: 'boolean',
        default: false
      })
      .option('i', {
        alias: 'ignore',
        describe: 'Files list to ignore watching',
        type: 'array',
        default: []
      })
  , ({ file, env, raw, ignore }) => {
    const pm2 = new PM2({ independent: true })
    const opts = {
      watch: true,
      autorestart: true,
      restart_delay: 2500,
      env,
      ignore_watch: ignore
        .concat(ignore.length ? 'node_modules' : [])
    }

    pm2.connect(() => {
      pm2.start(file, opts, (err, apps) => {
        if (err) {
          console.error(err)
          pm2.destroy(() => process.exit(0))
        } else {
          log('Apps:', apps.map(app => app.pm2_env.name))
          log('Processes:', apps.map(app => app.process.pid))

          Log.devStream(pm2.Client, 'all', raw, false, false)

          process.on('SIGINT', () => {
            log('Stopping...')
            pm2.delete('all', () => pm2.destroy(() => process.exit(0)))
          })
        }
      })
    })
  })

  .demandCommand()
  .recommendCommands()
  .strict()
  .help()
  .alias('h', 'help')
  .argv
