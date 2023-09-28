class Controller {
    constructor({ model, router }) {
        this.model = model;
        this.router = router;

        const Model = require(`../models/${this.model}`);
        Model.find({}).then(result => result.forEach(element => {
            if (!element._id) return;
            this.router.get(`/${this.model}/${element._id}`, this.authorization, this.readOne);
            this.router.delete(`/${this.model}/${element._id}`, this.authorization, this.deleteOne);
        })).catch(console.log);
    }

    authorization = (req, res, next) => {
        next();
    };

    readOne = (req, res) => {
        const Model = require(`../models/${this.model}`);
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

    deleteOne = (req, res) => {
        const Model = require(`../models/${this.model}`);
        const _id = req.url.replace(`/${this.model}/`, '');

        Model.findByIdAndDelete(_id).then(() => res.status(201).send(`Usuário ${_id} deletado com sucesso.`)).catch(result => {
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });

    };

    read = (req, res) => {
        const Model = require(`../models/${this.model}`);
        Model.find({}).then(result => res.status(201).send(result)).catch(result => {

            console.log('Erro autenticação');
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });

    };

    deleteAll = (req, res, next) => {
        const Model = require(`../models/${this.model}`);

        Model.deleteMany({}).then(() => {
            res.status(201).send('Todos os usuário deletado com sucesso.');
            next();
        }).catch(result => {

            console.log('Erro ao deletar todos os usuários');
            console.log(result);

            res.status(500).send('O servidor encontrou um erro interno e não pode processar a solicitação.');
        });

    };
}

module.exports = Controller;