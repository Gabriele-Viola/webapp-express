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

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id=?'

    const averageSql = 'SELECT movie_id, AVG(vote) AS average_vote FROM reviews WHERE movie_id=? GROUP BY movie_id'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })
        if (results.length == 0) return res.status(404).json({ err: 'book not found' })

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })

            connection.query(averageSql, [id], (err, avgResults) => {
                if (err) return res.status(500).json({ err: err })
                const average = avgResults[0].average_vote
                const film = {
                    ...results[0],
                    reviews: reviewsResults,
                    average_vote: average
                }
                res.json(film)
            })
        })
    })
}

module.exports = {
    index,
    show
}