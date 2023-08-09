const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getUserByEmail = "SELECT u FROM users u WHERE u.email = $1";
const addUser = "INSERT INTO users (username email role) VALUES ($1, $2, $3)"
const deleteUserById = "DELETE FROM users WHERE id = $1"
const updateUserById = "UPDATE users SET username = $1 WHERE id =$2"

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    addUser,
    deleteUserById,
    updateUserById

}