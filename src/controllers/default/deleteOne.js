module.exports = function () {
    return function (req, res) {
        const Model = require(`../../models/${this.model}`);
        const _id = req.url.replace(`/${this.model}/`, '');

        Model.findByIdAndDelete(_id).then(() => res.status(201).send(`Usuário ${_id} deletado com sucesso.`)).catch(result => {
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};