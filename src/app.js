const connection = require('../helper/mysql/mysql')
const express = require('express')
const app = new express()
const readOp = require('../helper/mongo/readOp')
const writeOp = require('../helper/mongo/writeOp')
const path = require('path')
const mysqlR = require('../helper/mysql/mysqlR')
const mysqlW = require('../helper/mysql/mysqlW')
const redisR = require('../helper/redis/redisR')
const redisW = require('../helper/redis/redisW')
const redisClient = require('../helper/redis/redisClient')
    // const querystring = require('query-string');

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
        console.log("sending row :", row)
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

app.get('/redisR/:key', (req, res) => {
    const _key = req.params.key
    redisR(redisClient, _key, (error, reply) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error)
        }
        res.send(reply)
    })

})

app.post('/redisW', (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const parsedData = JSON.parse(body)
        redisW(redisClient, parsedData, (error, reply) => {
            if (error) {
                console.log(error)
                return res.status(400).send(error)
            }
            res.send(reply)
        })
    })
})

app.get('*', (req, res) => {
    res.send('404')
})

app.listen(3000, () => { console.log("Server is up at port 3000!") })