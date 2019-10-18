const constants = require('./../utils/constants');
const ffmetadata = require('ffmetadata');
const fs = require('fs');

const newSongs = [];
let active = false;

function readMetadata(file) {
    return new Promise(function (resolve) {
        ffmetadata.read(constants.uploads + "/" + file, function (err, data) {
            if (err) resolve({success: false, error: "Error reading metadata : " + err.message});
            else resolve({success: true, data: data});
        });
    });
}

function readMetadataCover(file, path) {
    return new Promise(function (resolve) {
        ffmetadata.read(constants.uploads + "/" + file, { coverPath: path + "/cover.png" }, function (err, data) {
            if (err) resolve({ success: false, error: "Error reading metadata : " + err.message });
            else resolve({ success: true, data: data });
        });
    });
}

function addNewSong(ref, data) {
    newSongs.push({
        ref: ref,
        data: data
    });

    if (!active) consumeNewSongs();
}

async function consumeNewSongs() {
    active = true;
    let song = newSongs.pop();

    while (song) {
        await manageNewSong(song.ref, song.data);

        song = newSongs.pop();
    }
    active = false;
}

function manageNewSong(ref, data) {
    return new Promise((resolve => {
        const pathArtist = constants.library + "/" + data.album_artist;
        const pathAlbum = pathArtist + "/" + data.album;

        try {
            fs.mkdirSync(pathArtist);
        } catch (e) {
            // Do nothing
        }

        try {
            fs.mkdirSync(pathAlbum);
        } catch (e) {
            // Do nothing
        }

        try {
            fs.unlinkSync(pathAlbum + "/" + data.track + " - " + data.title);
        } catch (e) {
            // Do nothing
        }

        try {
            fs.unlinkSync(pathAlbum + "/cover.png");
        } catch (e) {
            // Do nothing
        }

        readMetadataCover(ref, pathAlbum).then(() => {
            fs.renameSync(constants.uploads + "/" + ref, pathAlbum + "/" + data.track + " - " + data.title + ".mp3");

            try {
                fs.unlinkSync(constants.uploads + "/" + ref);
            } catch (e) {
                // Do nothing
            }

            resolve();
        });
    }));
}

module.exports = {
    readMetadata,
    addNewSong
};