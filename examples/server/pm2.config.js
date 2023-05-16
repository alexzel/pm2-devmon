'use strict'

const env = process.argv.find((el, index, arr) =>
  index > 0 && arr[index - 1] === '--env')

const clusterOptions = env === 'prod'
  ? { instances: 'max', exec_mode: 'cluster' }
  : { watch: true }

module.exports = {
  apps: [{
    name: 'Server',
    namespace: '@myapp/server',
    script: 'server.js',
    env_dev: {
      NODE_ENV: 'development'
    },
    env_prod: {
      NODE_ENV: 'production'
    },
    ...clusterOptions
  }]
}
