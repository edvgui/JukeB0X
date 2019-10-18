const fs = require('fs-extra');
const constants = require('./../../utils/constants');


/**
 * @api {get} /library Get the artists of the library
 * @apiName artists
 * @apiGroup Navigation
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "Successfully retrieved the artists of the library",
 *       "data": ["Fall Out Boy","Fallulah","The Score"]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "status": "error"
 *       "message": "Internal server error"
 *     }
 */
async function artists(req, res) {
    fs.readdir(constants.library, (err, files) => {
        if (err) res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
        else res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved the artists of the library',
            data: files
        });
    });
}


/**
 * @api {get} /library/:artist Get the albums of the specified artist
 * @apiName albums
 * @apiGroup Navigation
 *
 * @apiParam {String} artist The name of the artist
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "Successfully retrieved the artists of the library",
 *       "data": ["Dear Future Self (Hands Up)"]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error"
 *       "message": "This artist couldn't be found"
 *     }
 */
async function albums(req, res) {
    const artist = req.params.artist;

    fs.readdir(constants.library + "/" + artist, (err, files) => {
        if (err) res.status(404).json({
            status: 'error',
            message: "This artist couldn't be found"
        });
        else res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved the albums of the artist',
            data: files
        });
    });
}


/**
 * @api {get} /library/:artist/:album Get the tracks of the album
 * @apiName tracks
 * @apiGroup Navigation
 *
 * @apiParam {String} artist The name of the artist
 * @apiParam {String} album The name of the album
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "Successfully retrieved the artists of the library",
 *       "data": ["1 - Dear Future Self (Hands Up).mp3","cover.png"]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error"
 *       "message": "This album couldn't be found"
 *     }
 */
async function tracks(req, res) {
    const artist = req.params.artist;
    const album = req.params.album;

    fs.readdir(constants.library + "/" + artist + "/" + album, (err, files) => {
        if (err) res.status(404).json({
            status: 'error',
            message: "This album couldn't be found"
        });
        else res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved the albums of the artist',
            data: files
        });
    });
}


/**
 * @api {get} /library/:artist/:album/:file Download a specified file
 * @apiName file
 * @apiGroup Navigation
 *
 * @apiParam {String} artist The name of the artist
 * @apiParam {String} album The name of the album
 * @apiParam {String} file The name of the file
 *
 */
async function file(req, res) {
    const artist = req.params.artist;
    const album = req.params.album;
    const file = req.params.file;

    return res.download(constants.library + "/" + artist + "/" + album + "/" + file);
}


module.exports = {
    artists,
    albums,
    tracks,
    file,
};