'use strict'

const env = process.argv.find((el, index, arr) =>
  index > 0 && arr[index - 1] === '--env')

const production = env === 'prod'

const clusterOptions = production
  ? { instances: 'max', exec_mode: 'cluster' }
  : {}

module.exports = {
  apps: [{
    name: 'Server',
    namespace: '@myapp/server',
    script: 'server.js',
    watch: !production,
    env_dev: {
      NODE_ENV: 'development'
    },
    env_prod: {
      NODE_ENV: 'production'
    },
    ...clusterOptions
  }]
}
