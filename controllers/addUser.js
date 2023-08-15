const { log } = require('console');
const { pool, queries } = require('../db')

const addUser = async (req, res, next) => {
    const { username, email, role, state, firstName, lastName } = req.body;

    try {
        await pool.query('BEGIN');
        const profileValues = [firstName, lastName, state];
        const profileResult = await pool.query(queries.insertProfileQuery, profileValues);
        const profileId = profileResult.rows[0].id;
        const userValues = [username, email, role, profileId];
        const userResult = await pool.query(queries.insertUserQuery, userValues);
        const { id } = userResult.rows[0];
        const result = await pool.query(queries.getUserQuery, [id]);
        await pool.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
};

module.exports = addUser;
