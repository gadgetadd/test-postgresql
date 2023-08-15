CREATE TYPE userRoles AS ENUM ('admin', 'user');
CREATE TYPE stateType AS ENUM ('male', 'female');

CREATE TABLE IF NOT EXISTS "profile" (
    id        SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName  VARCHAR(255) NOT NULL,
    state     stateType NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
    id         SERIAL PRIMARY KEY,
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) UNIQUE NOT NULL,
    role       userRoles,
    dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profileId  INTEGER REFERENCES "profile"(id) ON DELETE CASCADE
);

BEGIN;
INSERT INTO "profile" (firstName, lastName, state)
VALUES ('Max', 'Ostapchuk', 'male')
RETURNING id INTO profile_id;

INSERT INTO "user" (username, email, role, profileId)
VALUES ('mostapchuk', 'max@mail.com', 'user', profile_id);
COMMIT;
