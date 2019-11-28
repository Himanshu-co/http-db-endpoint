const mysql = require('mysql')

const mysqlW = (connection, row, callback) => {
    const queryString = 'INSERT INTO new_table (name,email) VALUES (?, ?)'
    connection.query(queryString, [row.name, row.email], (error, rows, fields) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, rows)
    })
}
module.exports = mysqlW