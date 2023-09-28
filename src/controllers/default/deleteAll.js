module.exports = function () {
    return function (req, res) {
        const Model = require(`../../models/${this.model}`);

        Model.deleteMany({}).then(() => res.status(201).send('Todos os usuário deletado com sucesso.')).catch(result => {

            console.log('Erro ao deletar todos os usuários');
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};