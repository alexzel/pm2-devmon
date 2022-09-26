'use strict'

const log = require('../src/log')

describe('log', () => {
  let consoleLog
  beforeEach(() => {
    consoleLog = console.log
    console.log = jest.fn()
  })

  afterAll(() => {
    console.log = consoleLog
  })

  it('calls console.log with colored text', () => {
    log('test')
    expect(console.log).toHaveBeenCalledWith('\x1b[32m%s\x1b[0m', 'test')
  })
})
