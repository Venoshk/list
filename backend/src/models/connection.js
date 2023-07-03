const mysql = require('mysql2/promise');

require('dotenv').config({ path: require('find-config')('.env') })


const connection = mysql.createPool({
   host: process.env.MYSQL_HOTS,
   user: process.env.MYSQL_USER,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DB,
});



module.exports =  connection; 