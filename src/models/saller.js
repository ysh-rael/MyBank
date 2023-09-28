const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, default: 'saller' },
    fullName: String,
    cnpj: String,
    email: String,
    value: { type: Number, default: 0.00 },
    lockedValue: { type: Number, default: 0.00 },
    authorization: {
        toSend: { type: Array, default: [] },
        toReceive: { type: Array, default: ['client'] }
    }
});

module.exports = mongoose.model('saller', schema);