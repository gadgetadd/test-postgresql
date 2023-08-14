const { pool } = require('../db')

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    const deleteUserQuery = `
        DELETE FROM "user"
        WHERE id = $1
        RETURNING profileId;
    `;

    const deleteProfileQuery = `
        DELETE FROM "profile"
        WHERE id = $1;
    `;

    try {
        await pool.query('BEGIN');
        const userResult = await pool.query(deleteUserQuery, [id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        };
        const { profileid } = userResult.rows[0];
        await pool.query(deleteProfileQuery, [profileid]);
        await pool.query('COMMIT');
        res.status(204).send();
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
};

module.exports = deleteUser;

