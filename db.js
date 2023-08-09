const Pool = require('pg').Pool;

const pool = new Pool({
    user: "mostapchuk",
    host: "localhost",
    database: 'users',
    password: 'MOstapcuk',
    port: 5434
});

module.exports = pool;
