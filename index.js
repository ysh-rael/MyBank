try {
    const express = require('express');
    const bodyParser = require('body-parser');
    const { db, routers } = require('./src/config');

    require('dotenv').config();

    const port = process.env.APP_PORT || 3002;

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    db.connect().then(() => {
        console.log('Conectado ao banco de dados');

        app.listen(port, () => console.log(`🚀: listen app in port ${port}`));

        app.use(routers);

    }).catch(err => {
        console.log(`Erro ao banco de dados: ${err}`);
    });
} catch (err) { console.log(err); }

