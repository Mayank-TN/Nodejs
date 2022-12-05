const mysql = require('mysql2')

const pool = mysql.createPool({
    host : 'localhost' ,
    user : 'root' ,
    database : 'database' ,
    password : 'Tekken99@'
})

module.exports = pool.promise()