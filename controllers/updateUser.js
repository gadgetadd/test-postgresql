const { pool, queries } = require('../db')

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, email, role, state, firstName, lastName } = req.body;

    try {
        await pool.query('BEGIN');
        const userValues = [username, email, role, id];
        const userResult = await pool.query(queries.updateUserQuery, userValues);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        const { profileid } = userResult.rows[0];
        const profileValues = [firstName, lastName, state, profileid];
        await pool.query(queries.updateProfileQuery, profileValues);
        const result = await pool.query(queries.getUserQuery, [id]);
        await pool.query('COMMIT');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
};

module.exports = updateUser;

