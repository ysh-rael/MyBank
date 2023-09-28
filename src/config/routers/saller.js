module.exports = function (router) {
    const nomeModel = 'saller';
    const controller = require(`../../controllers/${nomeModel}`);
    const instance = new controller({ model: nomeModel, router: router });

    /** Rotas saller */
    router.get(`/${nomeModel}`, instance.read);
    router.delete(`/${nomeModel}`, instance.deleteAll);
    router.post(`/${nomeModel}`, instance.validation, instance.authentication, instance.create);
    return router;
};