const redis = require('redis')
const client = redis.createClient()
client.on('connect', () => {
    console.log("Connected to redis structure!")
})
module.exports = client