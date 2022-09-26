'use strict'

const { custom: PM2 } = require('pm2')
const start = require('../src/start')

const OPTIONS = {
  file: 'test-file',
  env: 'test-env',
  raw: true,
  ignore: []
}

describe('start', () => {
  let connectSpy
  let startSpy
  beforeAll(() => {
    connectSpy = jest.spyOn(PM2.prototype, 'connect')
    connectSpy.mockImplementation(cb => cb())

    startSpy = jest.spyOn(PM2.prototype, 'start')
    startSpy.mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('calls pm2.connect', () => {
    start(OPTIONS)
    expect(connectSpy).toHaveBeenCalled()
  })

  it('calls pm2.start', () => {
    start(OPTIONS)
    expect(startSpy.mock.calls[0][0]).toBe(OPTIONS.file)
    expect(startSpy.mock.calls[0][1]).toEqual({
      autorestart: true,
      env: OPTIONS.env,
      ignore_watch: OPTIONS.ignore,
      restart_delay: 2500,
      watch: true
    })
  })
})
