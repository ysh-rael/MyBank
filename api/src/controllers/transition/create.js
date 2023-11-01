const mongoose = require('mongoose');

module.exports = function () {
    return async function (req, res, next) {
        const Model = require(`../../models/${this.model}`);

        const { value } = req.body;
        const _id = new mongoose.Types.ObjectId();

        const result = await Model.create({
            _id,
            status: false,
            details: {
                receiver: req.transition.receiver._id,
                sender: req.transition.sender._id,
                value: value,
                Date: new Date()
            },
            finished: false,
        });

        if (!result) {
            res.status(400).send('A solicitação do cliente é inválida ou malformada.');
            return;
        }

        req.transition._id = _id;

        this.router.get(`/${this.model}/${_id}`, this.authorization, this.readOne);
        next();
    };
};