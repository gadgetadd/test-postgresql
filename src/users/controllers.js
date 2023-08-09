const pool = require('../../db')
const queries = require('./queries')

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (err, result) => {
        if (err) throw err;
        res.json(result.rows)
    })
}

const getUserById = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getUserById, [id], (err, result) => {
        if (err) throw err;
        res.json(result.rows)
    })
}

const addUser = (req, res) => {
    const { email } = req.body;
    pool.query(queries.getUserByEmail, [email], (err, result) => {
        if (result.rows.length) {
            res.status(409).json({ message: `User with email ${email} already exists` })
        } pool.query(queries.addUser, [...req.body], (err, result) => {
            if (err) throw err;
            res.status(201).json(result.rows)
        })
    })

}


const deleteUser = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getUserById, [id], (err, result) => {
        if (!result.rows.length) {
            res.status(404).json({ message: `User not found` })
        }
        pool.query(queries.deleteUserById, [id], (err, result) => {
            if (err) throw err;
            res.status(204).send()
        })
    })

}

const updateUser = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getUserById, [id], (err, result) => {
        if (!result.rows.length) {
            res.status(404).json({ message: `User not found` })
        }
        pool.query(queries.updateUserById, [username, id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result.rows)
        })
    })

}



module.exports = {
    getUsers,
    getUserById,
    addUser,
    deleteUser,
    updateUser
}