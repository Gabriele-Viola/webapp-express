const express = require('express')
const server = express()
const cors = require('cors')
const FilmRouter = require('./routes/films.js')
const NotFound = require('./middleware/NotFound.js')
const ServerErrorHandler = require('./middleware/ServerErrorHandler.js')

const HOST = process.env.HOST
const PORT = process.env.PORT

server.use(cors())

server.get('/', (req, res) => {
    res.send('Server is up n Running')
})

server.use('/api/films', FilmRouter)

server.use(NotFound)
server.use(ServerErrorHandler)

server.listen(PORT, () => {
    console.log(`Server start on port ${HOST}:${PORT}`);

})