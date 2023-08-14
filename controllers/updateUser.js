const { pool } = require('../db')

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { username, email, role, state, firstName, lastName } = req.body;

    const updateUserQuery = `
    UPDATE "user"
    SET username = COALESCE($1, username),
        email = COALESCE($2, email),
        role = COALESCE($3, role)
    WHERE id = $4
    RETURNING profileId;
    `;

    const updateProfileQuery = `
        UPDATE "profile"
        SET firstName = COALESCE($1, firstName),
            lastName = COALESCE($2, lastName),
            state = COALESCE($3, state)
        WHERE id = $4;
    `;

    const getUserQuery = `
        SELECT u.*,
            json_build_object(
                'state', p.state,
                'firstName', p.firstName,
                'lastName', p.lastName
            ) as profile
        FROM "user" u
        JOIN "profile" p ON u.profileId = p.id
        WHERE u.id = $1
    `;

    try {
        await pool.query('BEGIN');
        const userValues = [username, email, role, id];
        const userResult = await pool.query(updateUserQuery, userValues);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: `User with ID ${id} not found` });
        }
        const { profileid } = userResult.rows[0];
        const profileValues = [firstName, lastName, state, profileid];
        await pool.query(updateProfileQuery, profileValues);
        const result = await pool.query(getUserQuery, [id]);
        await pool.query('COMMIT');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        await pool.query('ROLLBACK');
        next(error);
    }
};

module.exports = updateUser;

