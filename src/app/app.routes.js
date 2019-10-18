const Router = require('express').Router;
const appController = require('./app.controllers');
const middlewares = require('./../utils/middlewares');

const routes = new Router();

routes.post('/upload', middlewares.mySongUpload, appController.uploadSong);
routes.post('/upload/many', middlewares.mySongsUpload, appController.uploadSongs);

routes.get('/library', appController.artists);
routes.get('/library/:artist', appController.albums);
routes.get('/library/:artist/:album', appController.tracks);
routes.get('/library/:artist/:album/:file', appController.file);

module.exports = routes;