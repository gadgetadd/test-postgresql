const { pool } = require('../db')

const getUsers = async (req, res, next) => {
    const { role } = req.params;
    let getUsersQuery = `
            SELECT u.*,
                json_build_object(
                    'state', p.state,
                    'firstName', p.firstName,
                    'lastName', p.lastName
                ) as profile
            FROM "user" u
            JOIN "profile" p ON u.profileId = p.id
            ${role ? 'WHERE u.role = $1' : ''}
        `;
    const queryValues = role ? [role] : [];
    const result = await pool.query(getUsersQuery, queryValues);
    res.json(result.rows);
}

module.exports = getUsers;