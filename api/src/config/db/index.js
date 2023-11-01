const mongoose = require('mongoose');
require('dotenv').config();
module.exports = class {
/**
     * Esta é uma função estática com parâmetro de autênticação para conexão com o banco.
     * Por padrão utiliza variáveis de ambiente para autênciação
     *
     * @param {string} user - autenticação: usuário. (default: DB_USER)
     * @param {string} pass - autenticação: senha. (default: DB_PASS)
     * @param {string} bank - banco a ser utilizado. (default: DB_BANK)
     * @returns {Promise<typeof mongoose>} - A soma dos dois números.
 */
    static async connect(user = process.env.DB_USER, pass = process.env.DB_PASS, bank = process.env.DB_BANK) {
        return await mongoose.connect(`mongodb+srv://${user}:${pass}@${bank}.mongodb.net/`);
    }
};