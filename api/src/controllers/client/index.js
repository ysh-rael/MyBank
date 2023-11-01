const Controller = require('..');
const create = require('./create');
const authentication = require('./authentication');
const validation = require('../default/validation');

module.exports = class extends Controller {
    constructor(option) {
        super(option);
    }

    validation = validation(['type', 'fullName', 'cpf', 'email', 'value']).bind(this);

    authentication = authentication().bind(this);

    create = create().bind(this);
};