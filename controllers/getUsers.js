const { pool, queries } = require('../db')

const getUsers = async (req, res, next) => {
    const { role } = req.params;

    const queryValues = role ? [role] : [];
    const result = await pool.query(queries.getUsersQuery(role), queryValues);
    res.json(result.rows);
}

module.exports = getUsers;