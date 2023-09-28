const Controller = require('..');
const mongoose = require('mongoose');

module.exports = class extends Controller {
    constructor(option) {
        super(option);
    }

    validation = (req, res, next) => {

        const camposObrigatórios = ['sender', 'receiver', 'value'];

        if (!req.body) return res.status(400).send('Corpo da solicitação ausente ou vazio');
        if (typeof req.body !== 'object') res.status(400).send('Espera-se que o corpo da solicitação seja um JSON');

        const keys = Object.keys(req.body);

        for (let campo in camposObrigatórios) {
            const test = keys.indexOf(camposObrigatórios[campo]);
            if (test === -1) return res.status(400).send(`Espera-se que o corpo da solicitação contenha um atributo com chave ${camposObrigatórios[campo]}`);
        }

        console.log('req.body: ');
        console.log(req.body);
        console.log('\n');

        next();
    };
    authenticationSender = (req, res, next) => {
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
            console.log('result.length: ' + result.length);
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

    authenticationReceiver = (req, res, next) => {
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
            console.log('result.length: ' + result.length);
            if (result.length < 1) return res.status(404).send('Remetente Não encontrado');
            if (result.length > 1) return res.status(202).send('Mais de um Remetente encontrado. Por motivos de segunça, nenhum será retornado e a transação será abortada.');

            console.log('authenticationReceiver finalizada.');
            result = result[0];

            if (req.transition)
                req.transition.receiver = {
                    _id: result._id,
                    value: result.value,
                };

            console.log(result);
            next();
        }).catch(result => {
            console.log('Erro autenticação');
            console.log(result);
            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };


    create = async (req, res, next) => {

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

    finish = async (req, res, next) => {
        try {
            console.log(req.transition);
            const ModelReceiver = require(`../../models/${req.body.receiver.type}`);
            const ModelSender = require(`../../models/${req.body.sender.type}`);
            const Model = require(`../../models/${this.model}`);

            const updateSender = await ModelSender.findByIdAndUpdate(req.transition.sender._id, { lockedValue: Number(req.body.value), $inc: { value: - Number(req.body.value) } }, { new: true });

            const updateReceiver = updateSender ? await ModelReceiver.findByIdAndUpdate(
                req.transition.receiver._id,
                { $inc: { value: req.body.value } }, // Usando $inc para incrementar o valor
                { new: true } // Para retornar o documento atualizado
            ) : false;

            const updateSenderFinally = updateReceiver ? await ModelSender.findByIdAndUpdate(req.transition.sender._id, { $inc: { lockedValue: - Number(req.body.value) } }, { new: true }) : false;

            console.log(updateSender);
            console.log(updateReceiver);
            console.log(updateSenderFinally);

            const sucessUpdate = !!(updateSender && updateReceiver && updateSenderFinally);

            console.log('sucessUpdate');
            console.log(sucessUpdate);



            const updateTransition = await Model.findByIdAndUpdate(req.transition._id, { status: sucessUpdate, finished: true }, { new: true });
            console.log(updateTransition);
            const [code, mg] = sucessUpdate && updateTransition ? [201, updateTransition] : [404, { err: true, msg: 'Algum envolvido com a transação não foi encontrado e por isso ela foi finalizada sem efetuar a transação.' }];

            res.status(code).send(mg);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        } finally {

            next();
        }

    };
};