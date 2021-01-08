const path = require('path');
const express = require('express');

const basePath = path.dirname(require.resolve('../..'));

const routes = express.Router();

routes.route('/*')
    .get(express.static(
        path.resolve(basePath, 'data', 'characters')
    ));

module.exports = routes;