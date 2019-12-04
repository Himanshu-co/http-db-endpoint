const mysql = require('mysql')
const express = require('express')
const router = express.Router()

//connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
})


router.get('/mysqlR/:id', (req, res) => {
    const id = req.params.id
    mysqlR(connection, id, (error, row) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error)
        }
        res.json(row)
    })
})

router.post('/mysqlW', (req, res) => {
    let body = ''

    req.on('data', (chunk) => {
        body += chunk.toString()
        console.log('dataevent')
    })

    req.on('end', () => {
        const parsedData = JSON.parse(body.toString())
        mysqlW(connection, parsedData, (error, reply) => {
            if (error) {
                console.log(error)
                return res.status(400).send(error)
            }
            res.send(reply)
        })
    })
})

//read
const mysqlR = (connection, _id, callback) => {
    const queryString = 'SELECT * FROM new_table WHERE id = ?'
    connection.query(queryString, [_id], (error, rows, fields) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, rows)
    })
}

//write
const mysqlW = (connection, row, callback) => {
    const queryString = 'INSERT INTO new_table (name,email) VALUES (?, ?)'
    connection.query(queryString, [row.name, row.email], (error, rows, fields) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, rows)
    })
}

module.exports = router