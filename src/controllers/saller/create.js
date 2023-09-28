const mongoose = require('mongoose');

module.exports = function () {
    return async function (req, res, next) {
        const Model = require(`../../models/${this.model}`);

        const { type, fullName, cnpj, email, value } = req.body;
        const _id = new mongoose.Types.ObjectId();

        const result = await Model.create({
            _id,
            type,
            fullName,
            cnpj,
            email,
            value: Number(value)
        });

        res.status(201).send(result);
        this.router.get(`/${this.model}/${_id}`, this.authorization, this.readOne);
        next();

    };
};