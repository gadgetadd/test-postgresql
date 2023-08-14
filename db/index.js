const pool = require('./db');
const createTables = require('./createTables');
const queries = require('./queries');

module.exports = {
    pool,
    createTables,
    queries
}