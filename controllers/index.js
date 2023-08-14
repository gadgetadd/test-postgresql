const addUser = require('./addUser')
const updateUser = require('./updateUser')
const deleteUser = require('./deleteUser')
const getUsers = require('./getUsers')
const { ctrlWrapper } = require('../helpers')

module.exports = {
    addUser: ctrlWrapper(addUser),
    updateUser: ctrlWrapper(updateUser),
    deleteUser: ctrlWrapper(deleteUser),
    getUsers: ctrlWrapper(getUsers),
}