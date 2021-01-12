const routes = require('express').Router(); 
const smashGgCtrl = require('../controllers/smashGgController')

routes.route('/:tournamentSlug')
    .post(smashGgCtrl.getSmashGgData);

module.exports = routes;