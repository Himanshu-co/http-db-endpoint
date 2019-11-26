const express = require('express')
const app = new express()
const readOp = require('./readOp')
const writeOp = require('./writeOp')
const path = require('path')

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
            res.send(error)
        }
        res.send('Number of rows modified are ' + count)
    })

})

app.get('*', (req, res) => {
    res.send('404')
})

app.listen(3000, () => { console.log("Server is up at port 3000!") })