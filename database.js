    const mysql = require('mysql2');
    const { HOST, USERNAME, PASSWORD, database, PORT } = process.env;
    console.log();
    const connpool = mysql.createPool({
        host: "10.20.2.173",
        user: "tps",
        password: "ttppss",
        database: "smartphone2"
    }, { debug: true });
    
    connpool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('Db is connected - The solution is: ', results[0].solution);
    });
    
    
    module.exports = connpool;