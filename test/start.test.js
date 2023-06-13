'use strict'

const { custom: PM2 } = require('pm2')
const start = require('../lib/start')

const OPTIONS = {
  cmd: 'test-file',
  env: 'test-env',
  raw: true,
  ignore: []
}

describe('start', () => {
  let connectSpy
  let startSpy
  beforeEach(() => {
    connectSpy = jest.spyOn(PM2.prototype, 'connect')
    connectSpy.mockImplementation(cb => cb())

    startSpy = jest.spyOn(PM2.prototype, 'start')
    startSpy.mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('calls pm2.connect', () => {
    start(OPTIONS)
    expect(connectSpy).toHaveBeenCalled()
  })

  it('calls pm2.start', () => {
    start(OPTIONS)
    expect(startSpy.mock.calls[0][0]).toBe(OPTIONS.cmd)
    expect(startSpy.mock.calls[0][1]).toEqual({
      autorestart: true,
      env: OPTIONS.env,
      ext: '',
      ignore_watch: OPTIONS.ignore,
      restart_delay: 2500,
      watch: true
    })
  })

  it('overrides default delay', () => {
    start({ ...OPTIONS, delay: 1000 })
    expect(startSpy.mock.calls[0][0]).toBe(OPTIONS.cmd)
    expect(startSpy.mock.calls[0][1]).toEqual({
      autorestart: true,
      env: OPTIONS.env,
      ext: '',
      ignore_watch: OPTIONS.ignore,
      restart_delay: 1000,
      watch: true
    })
  })

  it('defaults extensions when ignore specified and script passed', () => {
    const opts = { ...OPTIONS, ignore: ['dist'] }
    start(opts)
    expect(startSpy.mock.calls[0][0]).toBe(opts.cmd)
    expect(startSpy.mock.calls[0][1]).toEqual({
      autorestart: true,
      env: opts.env,
      ext: 'js,jsx,json,html,xml,env,ts,tsx',
      ignore_watch: opts.ignore.concat('node_modules'),
      restart_delay: 2500,
      watch: true
    })
  })

  it('does not pass default extensions when ignore specified and config passed', () => {
    const opts = { ...OPTIONS, ignore: ['dist'], cmd: 'config.json' }
    start(opts)
    expect(startSpy.mock.calls[0][0]).toBe(opts.cmd)
    expect(startSpy.mock.calls[0][1]).toEqual({
      autorestart: true,
      env: opts.env,
      ext: '',
      ignore_watch: opts.ignore.concat('node_modules'),
      restart_delay: 2500,
      watch: true
    })
  })
})
