module.exports = function () {
    return function(req, res, next) {
        const filter = {
            type: req.body.sender.type,
            $or: [
                { 'authorization.toSend': { $in: [req.body.receiver.type] } },
                { 'authorization.toSend': { $in: ['all'] } }
            ]
        };

        if (req.body.sender.cpf) filter.cpf = req.body.sender.cpf;
        if (req.body.sender.cnpj) filter.cnpj = req.body.sender.cnpj;

        const Model = require(`../../models/${req.body.sender.type}`);
        Model.find(filter).then(result => {

            if (result.length < 1) return res.status(404).send('Emissor Não encontrado');
            if (result.length > 1) return res.status(202).send('Mais de um Emissor encontrado. Por motivos de segunça, nenhum será retornado e a transação será abortada.');

            result = result[0];
            
            if (result.value < req.body.value) return res.status(401).send('Sem Saldo suficiente. Transação abortada.');

            req.transition = {};
            req.transition.sender = {
                _id: result._id,
                value: result.value,
            };

            console.log('authenticationSender finalizada.');
            next();
        }).catch(result => {
            console.log('Erro autenticação');
            console.log(result);
            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };
};