const Controller = require('..');
const mongoose = require('mongoose');

module.exports = class extends Controller {
    constructor(option) {
        super(option);
    }

    validation = (req, res, next) => {

        const camposObrigatórios = ['type', 'fullName', 'cpf', 'email', 'value'];

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
    authentication = (req, res, next) => {
        const filter = {
            type: req.body.type,
            $or: [
                { cpf: req.body.cpf },
                { email: req.body.email }
            ]
        };

        const Model = require(`../../models/${this.model}`);
        Model.find(filter).then(result => {
            console.log('result.length: ' + result.length);
            if (result.length) return res.status(400).send('Cliente já cadastrado.');

            console.log('autenticação finalizada.');
            next();
        }).catch(result => {
            console.log('Erro autenticação');
            console.log(result);
            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });
    };


    create = async (req, res, next) => {

        const Model = require(`../../models/${this.model}`);

        const { type, fullName, cpf, email, value } = req.body;
        const _id = new mongoose.Types.ObjectId();

        console.log('_id: ', _id);

        const result = await Model.create({
            _id,
            type,
            fullName,
            cpf,
            email,
            value: Number(value)
        });

        res.status(201).send(result);
        this.router.get(`/${this.model}/${_id}`, this.authorization, this.readOne);
        next();
    };
};