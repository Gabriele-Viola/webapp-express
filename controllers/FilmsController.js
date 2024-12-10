const connection = require('../database/connection.js')

function index(req, res) {

    connection.query(`SELECT * FROM movies`, (err, results) => {
        if (err) return res.status(500).json({ err: err })

        res.json({
            films: results,
            count: results.length
        })
    })

}

module.exports = {
    index
}