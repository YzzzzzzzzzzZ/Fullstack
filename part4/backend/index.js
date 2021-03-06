const http = require('http')
const app = require('./app')

const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT
server.listen(PORT, () => {
  logger.info(`\r\n  Server running on http://localhost:${PORT} \r\n`)
})
