const constants = require('./constants');
const crypto = require('crypto');
const multer = require('multer');

const uploadSong = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, constants.uploads);
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split(".");
            cb(null, crypto.createHash('md5').update(Date.now() + "").digest('hex') + "." + ext[ext.length - 1]);
        }
    }),
    limits: {
        fileSize: 20000000
    },
    fileFilter: function (req, file, cb) {
        const name = file.originalname;
        const sp = name.split(".");
        if (sp.length < 2 || sp[sp.length - 1] !== "mp3") cb(new Error("This file doesn't have a valid extension."));
        else cb(null, true);
    }
}).single('songFile');

const uploadSongs = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, constants.uploads);
        },
        filename: function (req, file, cb) {
            const ext = file.originalname.split(".");
            cb(null, crypto.createHash('md5').update(Date.now() + "").digest('hex') + "." + ext[ext.length - 1]);
        }
    }),
    limits: {
        fileSize: 20000000
    },
    fileFilter: function (req, file, cb) {
        const name = file.originalname;
        const sp = name.split(".");
        if (sp.length < 2 || sp[sp.length - 1] !== "mp3") cb(new Error("This file doesn't have a valid extension."));
        else cb(null, true);
    }
}).array("songFiles", 20);

const formUpload = multer().none();

function mySongUpload(req, res, next) {
    uploadSong(req, res, function (err) {
        req.error = err;
        next();
    });
}

function mySongsUpload(req, res, next) {
    uploadSongs(req, res, function (err) {
        req.error = err;
        next();
    })
}

function myFormUpload(req, res, next) {
    formUpload(req, res, function (err) {
        req.error = err;
        next();
    });
}

module.exports = {
    mySongUpload,
    mySongsUpload,
    myFormUpload
};