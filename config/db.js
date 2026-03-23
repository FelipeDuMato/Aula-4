const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "147.15.54.250",
    user: "aula4",
    password: "Senha1234",
    database: "aula4",
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = pool;