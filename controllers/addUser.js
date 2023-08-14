const { pool } = require('../db')

const addUser = async (req, res, next) => {
    const { username, email, role, state, firstName, lastName } = req.body;
    const insertProfileQuery = `
            INSERT INTO "profile" (firstName, lastName, state)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
    const insertUserQuery = `
            INSERT INTO "user" (username, email, role, profileId)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
    try {
        await pool.query('BEGIN');
        const profileValues = [firstName, lastName, state];
        const profileResult = await pool.query(insertProfileQuery, profileValues);
        const profileId = profileResult.rows[0].id;
        const userValues = [username, email, role, profileId];
        const userResult = await pool.query(insertUserQuery, userValues);
        await pool.query('COMMIT');
        res.status(201).json(userResult.rows);
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
};

module.exports = addUser;
