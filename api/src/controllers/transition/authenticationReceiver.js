module.exports = function () {
    return function (req, res, next) {
        const filter = {
            type: req.body.receiver.type,
            $or: [
                { 'authorization.toReceive': { $in: [req.body.sender.type] } },
                { 'authorization.toReceive': { $in: ['all'] } }
            ]
        };

        if (req.body.receiver.cpf) filter.cpf = req.body.receiver.cpf;
        if (req.body.receiver.cnpj) filter.cnpj = req.body.receiver.cnpj;

        const Model = require(`../../models/${req.body.receiver.type}`);
        Model.find(filter).then(result => {
            
            if (result.length < 1) return res.status(404).send('Remetente Não encontrado');
            if (result.length > 1) return res.status(202).send('Mais de um Remetente encontrado. Por motivos de segunça, nenhum será retornado e a transação será abortada.');

            console.log('authenticationReceiver finalizada.');
            result = result[0];

            if (req.transition)
                req.transition.receiver = {
                    _id: result._id,
                    value: result.value,
                };

            next();
        }).catch(result => {
            console.log('Erro autenticação');
            console.log(result);
            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};