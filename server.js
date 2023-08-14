require("dotenv").config();
const app = require('./app')
const { createTables } = require('./createTables');

const port = process.env.PORT || 3003;

const startServer = async () => {
    try {
        await createTables();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error('Error creating database:', error);
    }
};

startServer();