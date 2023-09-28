module.exports = function () {
    return function (req, res) {
        const Model = require(`../../models/${this.model}`);
        Model.find({}).then(result => res.status(201).send(result)).catch(result => {

            console.log('Erro autenticação');
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};