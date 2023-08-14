const getUsersQuery = (role) => (`
            SELECT u.*,
                json_build_object(
                    'state', p.state,
                    'firstName', p.firstName,
                    'lastName', p.lastName
                ) as profile
            FROM "user" u
            JOIN "profile" p ON u.profileId = p.id
            ${role ? 'WHERE u.role = $1' : ''}
        `);

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

const deleteUserQuery = `
        DELETE FROM "user"
        WHERE id = $1
        RETURNING profileId;
    `;

const deleteProfileQuery = `
        DELETE FROM "profile"
        WHERE id = $1;
    `;

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

module.exports = {
    getUsersQuery,
    getUserQuery,
    updateProfileQuery,
    updateUserQuery,
    deleteProfileQuery,
    deleteUserQuery,
    insertUserQuery,
    insertProfileQuery
    }
