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

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id=? ORDER BY updated_at DESC'

    const averageSql = 'SELECT movie_id, AVG(vote) AS average_vote FROM reviews WHERE movie_id=? GROUP BY movie_id'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ err: err })
        if (results.length == 0) return res.status(404).json({ err: 'book not found' })

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })


            const film = {
                ...results[0],
                reviews: reviewsResults,
            }
            res.json(film)

        })
    })
}
function createRev(req, res) {
    const movie_id = Number(req.params.id)
    console.log(req.body);

    const { name, vote, text } = req.body

    // new Date().toISOString().slice(0, 10)
    const sql = "INSERT INTO `reviews` SET name=?, vote=?, text=?,  movie_id=?"
    connection.query(sql, [name, vote, text, movie_id], (err, result) => {
        console.log(err);
        if (err) return res.status(500).json('you did wrong something!')
        return res.status(201).json({ success: true })
    })
}
module.exports = {
    index,
    show,
    createRev
}