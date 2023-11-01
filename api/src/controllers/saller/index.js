const Controller = require('..');
const validation = require('../default/validation');
const authentication = require('./authentication');
const create = require('./create');

module.exports = class extends Controller {
    constructor(option) {
        super(option);
    }

    validation = validation(['type', 'fullName', 'cnpj', 'email', 'value']).bind(this);

    authentication = authentication().bind(this);

    create = create().bind(this);
};