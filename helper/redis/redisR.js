const redis = require('redis')

const read = (client, key, callback) => {
    client.get(key, (error, reply) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, reply)
    })
}

module.exports = read