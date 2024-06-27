const { Pool } = require('pg');

const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, "..", "config", "dev.env")
});
const connectDB = () => {
    return new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    })
}

module.exports = {connectDB}