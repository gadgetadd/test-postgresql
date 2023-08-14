const Pool = require('pg').Pool;

const { POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const pool = new Pool({
    user: POSTGRES_USER,
    host: "db",
    database: 'users',
    password: POSTGRES_PASSWORD,
    port: 5432
});


module.exports = pool;
