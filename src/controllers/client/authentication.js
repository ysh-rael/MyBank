module.exports = function () {
    return function (req, res, next) {
        const filter = {
            type: req.body.type,
            $or: [
                { cpf: req.body.cpf },
                { email: req.body.email }
            ]
        };

        const Model = require(`../../models/${this.model}`);
        Model.find(filter).then(result => {
            if (result.length) return res.status(400).send('Cliente já cadastrado.');
            next();
        }).catch(result => {
            console.log('Erro autenticação');
            console.log(result);
            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};