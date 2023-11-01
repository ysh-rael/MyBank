const Controller = require('..');
const validation = require('../default/validation');
const authenticationSender = require('./authenticationSender');
const authenticationReceiver = require('./authenticationReceiver');
const create = require('./create');
const finish = require('./finish');

module.exports = class extends Controller {
    constructor(option) {
        super(option);
    }

    validation = validation(['sender', 'receiver', 'value']).bind(this);
    
    authenticationSender = authenticationSender().bind(this);

    authenticationReceiver = authenticationReceiver().bind(this);


    create = create().bind(this);

    finish = finish().bind(this);
};