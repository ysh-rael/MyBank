
module.exports = function (camposObrigatórios) {
    return async function (req, res, next) {
        if(typeof camposObrigatórios !== 'object') return res.status(500).send('Servidor não conseguiu obter os campos obrigatórios a serem validados.');

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
};