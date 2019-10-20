const fs = require('fs-extra');
const crypto = require('crypto');

const constants = require('./../../utils/constants');
const helpers = require('./management.helpers');

/**
 * @api {post} /upload Upload a mp3 file
 * @apiName uploadSong
 * @apiGroup Management
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
 * @apiGroup Management
 *
 * @apiHeader {String} Content-Type=multipart/form-data
 *
 * @apiParam {[File]} songFiles Music mp3 files.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "status": "success",
 *       "message": "You successfully uploaded your songs",
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
            message: 'You successfully uploaded your songs',
            data: list
        });
    }
}


/**
 * @api {post} /import Import a mp3 file from a url
 * @apiName importSong
 * @apiGroup Management
 *
 * @apiHeader {String} Content-Type=multipart/form-data
 *
 * @apiParam {String} songUrl Music mp3 file url.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "status":"success",
 *       "message":"You successfully imported your song",
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
async function importSong(req, res) {
    const url = req.body.songUrl;
    if (!url) return res.status(400).json({
        status: 'error',
        message: 'Please give a url'
    });

    const filename = crypto.createHash('md5').update(Date.now() + "").digest('hex') + ".mp3";

    helpers.downloadSong(filename, url).then(() => {
        helpers.readMetadata(filename).then((data) => {
            helpers.addNewSong(filename, data.data);

            return res.status(201).json({
                status: 'success',
                message: 'You successfully imported your song',
                data: data.data
            });
        }).catch((err) => {
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error : ' + err
            });
        });
    }).catch(err => {
        res.status(400).json({
            status: 'error',
            message: "Couldn't import the file : " + url
        });
    });
}


/**
 * @api {delete} /library Delete all the content of the library
 * @apiName deleteLibrary
 * @apiGroup Management
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "The folder has been deleted"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "status": "error"
 *       "message": "Internal server error"
 *     }
 */
async function deleteLibrary(req, res) {
    fs.remove(constants.library).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'The folder has been deleted'
        })
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error : ' + err
        });
    });
}


/**
 * @api {delete} /library/:artist Delete the artist folder
 * @apiName deleteArtist
 * @apiGroup Management
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "The folder has been deleted"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "status": "error"
 *       "message": "Internal server error"
 *     }
 */
async function deleteArtist(req, res) {
    const artist = req.params.artist;

    fs.remove(constants.library + "/" + artist).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'The folder has been deleted'
        })
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error : ' + err
        });
    });
}


/**
 * @api {delete} /library/:artist/:album Delete the album folder
 * @apiName deleteAlbum
 * @apiGroup Management
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "The folder has been deleted"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "status": "error"
 *       "message": "Internal server error"
 *     }
 */
async function deleteAlbum(req, res) {
    const artist = req.params.artist;
    const album = req.params.album;

    fs.remove(constants.library + "/" + artist + "/" + album).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'The folder has been deleted'
        })
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error : ' + err
        });
    });
}


/**
 * @api {delete} /library/:artist/:album/:file Delete the file
 * @apiName deleteFile
 * @apiGroup Management
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "The file has been deleted"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "status": "error"
 *       "message": "Internal server error"
 *     }
 */
async function deleteFile(req, res) {
    const artist = req.params.artist;
    const album = req.params.album;
    const file = req.params.file;

    fs.remove(constants.library + "/" + artist + "/" + album + "/" + file).then(() => {
        res.status(200).json({
            status: 'success',
            message: 'The file has been deleted'
        })
    }).catch(err => {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error : ' + err
        });
    });
}


module.exports = {
    uploadSong,
    uploadSongs,
    importSong,
    deleteLibrary,
    deleteArtist,
    deleteAlbum,
    deleteFile
};