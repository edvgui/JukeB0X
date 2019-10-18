const Router = require('express').Router;
const navigationController = require('./navigation.controllers');

const routes = new Router();

routes.get('/library', navigationController.artists);
routes.get('/library/:artist', navigationController.albums);
routes.get('/library/:artist/:album', navigationController.tracks);
routes.get('/library/:artist/:album/:file', navigationController.file);

module.exports = routes;