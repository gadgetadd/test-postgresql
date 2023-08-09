CREATE TYPE userRoles AS ENUM ('admin', 'employee');

CREATE TYPE stateType AS ENUM ('male', 'female');

CREATE TABLE User (
  id         SERIAL PRIMARY KEY,
  username   VARCHAR(255) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  role       userRoles,
  dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profileId  INTEGER UNIQUE,
  FOREIGN KEY (profileId) REFERENCES Profile(id) ON DELETE CASCADE
);

CREATE TABLE Profile (
  id        SERIAL PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName  VARCHAR(255) NOT NULL,
  state     stateType NOT NULL,
 );
