'use strict'

process.env.PM2_NO_INTERACTION = 'true'
process.env.PM2_DISCRETE_MODE = true

const commander = require('commander')
const { custom: PM2 } = require('pm2')
const Log = require('pm2/lib/API/Log')
const { version } = require('../package.json')

const log = (...msg) =>
  console.log('\x1b[32m%s\x1b[0m', ...msg)

commander.version(version, '-v, --version', 'output the current version')
  .description('pm2-devmon development environment monitor using independent mode')
  .option('--raw', 'raw log output')
  .option('--ignore [files]', 'files list to ignore watching')
  .option('--env [name]', 'env_[name] env variables in process file')
  .usage('pm2-devmon start process.json')

commander.exitOverride(err => {
  if (err.code === 'commander.unknownOption' || err.code === 'commander.missingArgument') {
    commander.outputHelp()
  }
})

const pm2 = new PM2({ independent: true })

commander.command('start <js|config.js|process.json>')
  .description('start script or config or process file')
  .action((cmd, opts) => {
    commander.watch = true
    commander.autorestart = true
    commander.restart_delay = 2500

    if (commander.ignore) {
      commander.ignore_watch = commander.ignore.split(',')
      commander.ignore_watch.push('node_modules')
    }

    pm2.connect(() => {
      pm2.start(cmd, commander, (err, apps) => {
        if (err) {
          console.error(err)
          pm2.destroy(() => process.exit(0))
        } else {
          log('Apps:', apps.map(app => app.pm2_env.name))
          log('Processes:', apps.map(app => app.process.pid))

          Log.devStream(pm2.Client, 'all', commander.raw, false, false)

          process.on('SIGINT', () => {
            log('Stopping...')
            pm2.delete('all', () => pm2.destroy(() => process.exit(0)))
          })
        }
      })
    })
  })

commander.parse(process.argv)
