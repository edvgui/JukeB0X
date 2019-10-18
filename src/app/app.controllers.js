const fs = require('fs');

const constants = require('./../utils/constants');
const helpers = require('./app.helpers');

/**
 * @api {post} /upload Upload a mp3 file
 * @apiName uploadSong
 * @apiGroup App
 *
 * @apiHeader {String} Content-Type=multipart/form-data
 *
 * @apiParam {File} songFile Music mp3 file.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "status":"success",
 *       "message":"You successfully uploaded your song",
 *       "data": {
 *         "title":"Wild Stare",
 *         "artist":"Giant Rooks",
 *         "album":"Wild Stare",
 *         "album_artist":"Giant Rooks",
 *         "track":"1",
 *         "date":"2018",
 *         "genre":"Rock",
 *         "encoder":"Lavf57.83.100"
 *       }
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "error",
 *       "message": "Something went wrong, please make sure you have selected a file."
 *     }
 */
async function uploadSong(req, res) {
    if (req.error) return res.status(500).json({
        status: 'error',
        message: 'Internal server error : ' + req.error
    });
    else if (!req.file) return res.status(400).json({
        status: 'error',
        message: 'Something went wrong, please make sure you have select a file.'
    });
    else {
        const data = await helpers.readMetadata(req.file.filename);
        helpers.addNewSong(req.file.filename, data.data);

        return res.status(201).json({
            status: 'success',
            message: 'You successfully uploaded your song',
            data: data.data
        });
    }
}


/**
 * @api {post} /upload/many Upload some mp3 files
 * @apiName uploadSongs
 * @apiGroup App
 *
 * @apiHeader {String} Content-Type=multipart/form-data
 *
 * @apiParam {[File]} songFiles Music mp3 files.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "success",
 *       "message": "You successfully uploaded your song",
 *       "data": [
 *           {
 *               "title": "Hunger",
 *               "artist": "The Score",
 *               "album": "Stay",
 *               "album_artist": "The Score",
 *               "track": "5",
 *               "date": "2019",
 *               "genre": "Alternative",
 *               "encoder": "Lavf57.83.100"
 *           },
 *           {
 *               "title": "Run Like A Rebel",
 *               "artist": "The Score",
 *               "album": "Stay",
 *               "album_artist": "The Score",
 *               "track": "4",
 *               "date": "2019",
 *               "genre": "Alternative",
 *               "encoder": "Lavf57.83.100"
 *           }
 *       ]
 *   }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "error",
 *       "message": "Something went wrong, please make sure you have selected a file."
 *     }
 */
async function uploadSongs(req, res) {
    if (req.error) return res.status(500).json({
        status: 'error',
        message: 'Internal server error : ' + req.error
    });
    else if (!req.files) return res.status(400).json({
        status: 'error',
        message: 'Something went wrong, please make sure you have select a file.'
    });
    else {
        const list = [];
        let file = req.files.pop();
        while (file) {
            const data = await helpers.readMetadata(file.filename);
            list.push(data.data);
            helpers.addNewSong(file.filename, data.data);

            file = req.files.pop();
        }

        return res.status(201).json({
            status: 'success',
            message: 'You successfully uploaded your song',
            data: list
        });
    }
}


/**
 * @api {get} /library Get the artists of the library
 * @apiName artists
 * @apiGroup App
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
 * @apiGroup App
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
 * @apiGroup App
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
 * @apiGroup App
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
    uploadSong,
    uploadSongs,
    artists,
    albums,
    tracks,
    file
};