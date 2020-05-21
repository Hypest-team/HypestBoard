const overlaysController = require('../controllers/overlaysController');

module.exports = function (app) {
    app.use('/overlays', overlaysController.getOverlays);
};