const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'user',
    password: 'user',
    host: "db",
    database: 'users',
    port: 5432
});


module.exports = pool;
