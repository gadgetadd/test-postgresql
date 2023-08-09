const pool = require('./db'); // Файл з підключенням до бази даних

const createTables = async () => {
    try {
        const client = await pool.connect();

        await client.query(`
      CREATE TYPE userRoles AS ENUM ('admin', 'employee');
      CREATE TYPE stateType AS ENUM ('male', 'female');
    `);

        await client.query(`
      CREATE TABLE User (
        id         SERIAL PRIMARY KEY,
        username   VARCHAR(255) NOT NULL,
        email      VARCHAR(255) UNIQUE NOT NULL,
        role       userRoles,
        dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        profileId  INTEGER UNIQUE REFERENCES Profile(id) ON DELETE CASCADE
      );

      CREATE TABLE Profile (
        id        SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName  VARCHAR(255) NOT NULL,
        state     stateType NOT NULL
      );
    `);

        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        client.release();
    }
};

createTables();