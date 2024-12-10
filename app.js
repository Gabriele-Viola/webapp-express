const express = require('express')
const server = express()
const FilmRouter = require('./routes/films.js')

const HOST = process.env.HOST
const PORT = process.env.PORT

server.get('/', (req, res) => {
    res.send('Server is up n Running')
})

server.use('/api/films', FilmRouter)

server.listen(PORT, () => {
    console.log(`Server start on port ${HOST}:${PORT}`);

})