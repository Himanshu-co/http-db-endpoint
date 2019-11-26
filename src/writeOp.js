const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const databaseName = 'task-manager'
const connectionURL = 'mongodb://127.0.0.1:27017'

const writeOp = (callback) => {
    const client = new MongoClient(connectionURL, { useNewUrlParser: true })
    client.connect((error) => {
        if (error) {
            callback('Unable to connect Database')
        }
        const db = client.db(databaseName)
        db.collection('tasks').insertOne({
            description: 'Do Exercise',
            completed: false
        }, (error, result) => {
            if (error) {
                callback('Unable to Insert!', undefined)
            }
            callback(undefined, result.insertedCount)
        })
    })
}

module.exports = writeOp