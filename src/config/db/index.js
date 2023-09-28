const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const bank = process.env.DB_BANK;

module.exports = class {
    static async connect () {
        return await mongoose.connect(`mongodb+srv://${user}:${pass}@${bank}.mongodb.net/`);
    }
};