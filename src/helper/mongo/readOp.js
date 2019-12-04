const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const databaseName = 'task-manager'
const connectionUrl = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(connectionUrl, { useNewUrlParser: true })

const readOp = (callback) => {
    client.connect((error) => {
        if (error) {
            callback('Unable to connect to database!', undefined)
        }
        const db = client.db(databaseName)
        db.collection('tasks').find({ completed: true }).toArray((error, task) => {
            if (error) {
                callback('Unable to fetch Data from Database', undefined)
            }
            callback(undefined, task)
        })
    })
}

module.exports = readOp