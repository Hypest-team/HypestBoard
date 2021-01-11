const express = require('express');
const { getServerConfig } = require('../controllers/serverConfigController');

const routes = express.Router();

module.exports = ({hostname, port, baseUrl}) => {
    const homepage = `//${hostname}:${port}${baseUrl || ''}`;

    return routes.use(getServerConfig({
        homepage,
        hostname,
        port,
        baseUrl,
    }));
};