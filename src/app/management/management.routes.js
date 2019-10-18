const Router = require('express').Router;
const managementController = require('./management.controllers');
const middlewares = require('./../../utils/middlewares');

const routes = new Router();

routes.post('/upload', middlewares.mySongUpload, managementController.uploadSong);
routes.post('/upload/many', middlewares.mySongsUpload, managementController.uploadSongs);
routes.post('/import', middlewares.myFormUpload, managementController.importSong);

routes.delete('/library', managementController.deleteLibrary);
routes.delete('/library/:artist', managementController.deleteArtist);
routes.delete('/library/:artist/:album', managementController.deleteAlbum);
routes.delete('/library/:artist/:album/:file', managementController.deleteFile);

module.exports = routes;