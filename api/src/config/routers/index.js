const { Router } = require('express');
const routerClient = require('./client');
const routerSaller = require('./saller');
const routerTransition = require('./transition.js');
const router = Router();

routerClient(router);
routerSaller(router);
routerTransition(router);


module.exports = router;