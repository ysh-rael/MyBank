module.exports = function (router) {
    const nomeModel = 'client';
    const controller = require(`../../controllers/${nomeModel}`);
    const instance = new controller({ model: nomeModel, router: router });

    /** Rotas client */
    router.get(`/${nomeModel}`, instance.read);
    router.delete(`/${nomeModel}`, instance.deleteAll);
    router.post(`/${nomeModel}`, instance.validation, instance.authentication, instance.create);
    return router;
};