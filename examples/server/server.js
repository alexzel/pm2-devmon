'use strict'

const http = require('node:http')

const PORT = 8000
const HOST = '127.0.0.1'

const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end(process.env.NODE_ENV)
})

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`)
})
