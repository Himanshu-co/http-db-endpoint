// const mysql = require('mysql')
const mysqlR = (connection, _id, callback) => {
    const queryString = 'SELECT * FROM new_table WHERE id = ?'
    connection.query(queryString, [_id], (error, rows, fields) => {
        if (error) {
            callback(error, undefined)
        }
        callback(undefined, rows)
    })
}

module.exports = mysqlR