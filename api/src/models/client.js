const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, default: 'client' },
    fullName: String,
    cpf: String,
    email: String,
    value: { type: Number, default: 0.00 },
    lockedValue: { type: Number, default: 0.00 },
    authorization: {
        toSend: { type: Array, default: ['all'] },
        toReceive: { type: Array, default: ['all'] }
    }
});

module.exports = mongoose.model('client', schema);