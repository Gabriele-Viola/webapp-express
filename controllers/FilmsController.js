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
function show(req, res) {
    const id = req.params.id
    const sql = 'SELECT * FROM movies WHERE id=?'

    const reviewsSql = 'SELECT * FROM reviews WHERE id=?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })
        if (results.lenght == 0) return res.status(404).json({ err: 'book not found' })
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })
            const film = {
                ...results[0],
                reviews: reviewsResults
            }
            res.json(film)
        })
    })
}

module.exports = {
    index,
    show
}