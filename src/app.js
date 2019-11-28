const connection = require('./mysql')
const express = require('express')
const app = new express()
const readOp = require('./readOp')
const writeOp = require('./writeOp')
const path = require('path')
const mysqlR = require('./mysqlR')
const mysqlW = require('./mysqlW')
const querystring = require('query-string');

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/read', (req, res) => {
    readOp((error, task) => {
        if (error) {
            return res.send(error)
        }
        res.send(task)
    })
})

app.get('/write', (req, res) => {
    writeOp((error, count) => {
        if (error) {
            return res.send(error)
        }
        res.send('Number of rows modified are ' + count)
    })

})

app.get('/mysqlR/:id', (req, res) => {
    const _id = req.params.id

    mysqlR(connection, _id, (error, row) => {
        if (error) {
            return res.status(400).send(error)
        }
        res.json(row)
    })
})

app.post('/mysqlW', (req, res) => {

    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const parsedData = JSON.parse(body.toString())

        mysqlW(connection, parsedData, (error, result) => {
            if (error) {
                return res.status(500).send(error)
            }
            res.send(result)
        })
    })
})


app.get('*', (req, res) => {
    res.send('404')
})

app.listen(3000, () => { console.log("Server is up at port 3000!") })