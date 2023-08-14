const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const usersRouter = require('./src/users/routes')

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter)

app.use((_, res) => {
    res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
    const { message = "Server error" } = err;
    const { statusCode = 500 } = err;
    res.status(statusCode).json({ message })
});

module.exports = app;