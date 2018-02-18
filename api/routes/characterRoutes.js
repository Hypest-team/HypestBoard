module.exports = function(app) {
	var characterCtrl = require('../controllers/characterController')

	app.route('/api/:game/characters/')
        .get(characterCtrl.getCharacters)
        .post(characterCtrl.createCharacter);

    app.route('/api/:game/characters/:charId')
        .get(characterCtrl.getCharacter)
        .put(characterCtrl.updateCharacter)
        .put(characterCtrl.deleteCharacter);
}
