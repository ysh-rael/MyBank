const authorization = require('./default/authorization');
const deleteAll = require('./default/deleteAll');
const deleteOne = require('./default/deleteOne');
const read = require('./default/read');
const readOne = require('./default/readOne');

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

    authorization = authorization().bind(this);

    readOne = readOne().bind(this);

    deleteOne = deleteOne().bind(this);

    read = read().bind(this);

    deleteAll = deleteAll().bind(this);
}

module.exports = Controller;