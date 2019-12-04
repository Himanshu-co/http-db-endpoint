const redis = require('redis')
const express = require('express')
const router = express.Router()
const client = redis.createClient()

client.on('connect', () => {
    console.log("Connected to redis structure!")
})

router.get('/redisR/:key', (req, res) => {
    const _key = req.params.key
    read(client, _key, (error, reply) => {
        if (error) {
            console.log(error)
            return res.status(400).send(error)
        }
        res.send(reply)
    })
})

router.post('/redisW', (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const parsedData = JSON.parse(body)
        write(client, parsedData, (error, reply) => {
            if (error) {
                console.log(error)
                return res.status(400).send(error)
            }
            res.send(reply)
        })
    })
})

//read
const read = (client, key, callback) => {
    client.get(key, (error, reply) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, reply)
    })
}

//write
const write = (client, data, callback) => {
    client.set(data.key, data.value, (error, reply) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, reply)
    })

}

module.exports = router