// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // change to your MySQL username
  password: '',         // change to your MySQL password
  database: 'testdb'    // create this DB in MySQL
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports = connection;
