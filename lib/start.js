'use strict'

const { custom: PM2 } = require('pm2')
const Log = require('pm2/lib/API/Log')
const Common = require('pm2/lib/Common')

const log = require('./log')

module.exports = ({ cmd, env, raw, ignore = [], ext = '', delay = 2500 }) => {
  const pm2 = new PM2({ independent: true })
  const opts = {
    watch: true,
    autorestart: true,
    restart_delay: delay,
    env,
    ignore_watch: ignore
      .concat(ignore.length ? 'node_modules' : []),
    ext: !ext && ignore.length && !Common.isConfigFile(cmd) && typeof cmd !== 'object'
      ? 'js,jsx,json,html,xml,env,ts,tsx'
      : ext
  }

  pm2.connect(() => {
    pm2.start(cmd, opts, (err, apps) => {
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
}
