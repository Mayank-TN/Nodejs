const mysql = require('mysql2')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('database' , 'root' , 'Tekken99@' , {
    host : 'localhost',
    dialect : 'mysql'
})

const pool = mysql.createPool({
    host : 'localhost' ,
    user : 'root' ,
    database : 'database' ,
    password : 'Tekken99@'
})

module.exports = sequelize;