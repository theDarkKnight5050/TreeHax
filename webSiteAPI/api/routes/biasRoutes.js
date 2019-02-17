'use strict';
module.exports = function(app) {
    var biasController = require('../controllers/todoListController.js');
    app.route('/').post(biasController.create);
    app.route('/seed').get(biasController.seed);
    app.route('/url').post(biasController.findUrl);
    app.route('/bias').post(biasController.findBais);
};