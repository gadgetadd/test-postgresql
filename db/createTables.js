const pool = require('./db')

const createTables = async () => {
  try {
    await pool.query('BEGIN');
    await pool.query(`CREATE TYPE  userRoles AS ENUM ('admin', 'user');`);
    await pool.query(`CREATE TYPE  stateType AS ENUM ('male', 'female');`);
    await pool.query(`
        CREATE TABLE IF NOT EXISTS "profile" (
        id        SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName  VARCHAR(255) NOT NULL,
        state     stateType NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id         SERIAL PRIMARY KEY,
        username   VARCHAR(255) NOT NULL,
        email      VARCHAR(255) UNIQUE NOT NULL,
        role       userRoles,
        dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        profileId  INTEGER UNIQUE REFERENCES "profile"(id) ON DELETE CASCADE
      );
    `);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = createTables;



