const mongoose = require('mongoose');

const mongoHost = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
const mongoCredentials = process.env.DB_USERNAME ?
    `${process.env.DB_USERNAME}:${encodeURIComponent(process.env.DB_PASSWORD)}@` : '';
const dbUrl = `mongodb://${mongoCredentials}${mongoHost}`;
const options = {
};

class Connection {
    static async connectToDB() {
        await mongoose.connect(dbUrl, options).then(() => {
            CONSOLE_LOGGER.info('MongoDB is connected');
        }).catch((err) => {
            CONSOLE_LOGGER.info('DB Connection err', err);
            CONSOLE_LOGGER.info('MongoDB connection unsuccessful, retry after 0.5 seconds.');
            setTimeout(Connection.connectToDB, 500);
        });
        return mongoose.connection.readyState;
    }

    static async checkConnection() {
        const db = mongoose.connection.readyState;
        return +db !== 1 ? await Connection.connectToDB() : db;
    }
}

module.exports = Connection;
