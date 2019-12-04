const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const databaseName = 'task-manager'
const connectionUrl = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionUrl, { useNewUrlParser: true })
const express = require('express')
const router = express.Router()

router.get('/mongoR/:taskStatus', (req, res) => {
    const taskStatus = req.params.taskStatus
    mongoR(taskStatus.toString(), (error, results) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error)
        }
        res.send(results)
    })
})

router.post('/mongoW', (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const parsedData = JSON.parse(body)

        mongoW(parsedData, (error, results) => {
            if (error) {
                console.log(error)
                return res.status(400).send(error)
            }
            res.send('Documents affected ' + results)
        })
    })
})


//read
const mongoR = (taskStatus, callback) => {
    client.connect((error) => {
        if (error) {
            callback('Unable to connect to database!', undefined)
        }
        const db = client.db(databaseName)
        db.collection('tasks').find({ completed: (taskStatus === 'true') }).toArray((error, task) => {
            if (error) {
                callback('Unable to fetch Data from Database', undefined)
            }
            callback(undefined, task)
        })
    })
}

//write
const mongoW = (data, callback) => {
    client.connect((error) => {
        if (error) {
            callback('Unable to connect Database')
        }
        const db = client.db(databaseName)
        db.collection('tasks').insertOne({
            description: data.description,
            completed: data.completed
        }, (error, result) => {
            if (error) {
                callback('Unable to Insert!', undefined)
            }
            callback(undefined, result.insertedCount)
        })
    })
}

module.exports = router