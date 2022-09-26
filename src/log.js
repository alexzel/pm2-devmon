'use strict'

module.exports = (...msg) =>
  console.log('\x1b[32m%s\x1b[0m', ...msg)
