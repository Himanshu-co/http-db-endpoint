const redis = require('redis')

const write = (client, data, callback) => {
    client.set(data.key, data.value, (error, reply) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, reply)
    })

}

module.exports = write