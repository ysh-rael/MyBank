module.exports = function () {
    return function (req, res) {
        const Model = require(`../../models/${this.model}`);
        const _id = req.url.replace(`/${this.model}/`, '');

        Model.find({ _id }).then(result => {

            if (result.length < 1) return res.status(404).send('Cliente não encontrado.');
            if (result.length > 1) return res.status(202).send('O Servidor encontrou mais de um cliente. Por motivos de segunça, nenhum será retornado.');

            res.status(201).send(result[0]);
        }).catch(result => {
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};