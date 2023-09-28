const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    status: { type: Boolean, default: false },
    details: {
        receiver: { type: mongoose.Schema.Types.ObjectId },
        sender: { type: mongoose.Schema.Types.ObjectId },
        value: Number,
        Date: { type: Date, default: Date.now }
    },
    finished: { type: Boolean, default: false }
});

module.exports = mongoose.model('transition', schema);