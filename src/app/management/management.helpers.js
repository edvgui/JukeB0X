const constants = require('./../../utils/constants');
const ffmetadata = require('ffmetadata');
const fs = require('fs-extra');
const http = require('http');

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
    return new Promise((async resolve => {
        const pathArtist = constants.library + "/" + data.album_artist;
        const pathAlbum = pathArtist + "/" + data.album;

        try {
            await fs.remove(pathAlbum + "/cover.png");
        } catch (e) {
            // Do nothing
        }

        readMetadataCover(ref, pathAlbum).then(async () => {
            try {
                await fs.move(constants.uploads + "/" + ref, pathAlbum + "/" + data.track + " - " + data.title + ".mp3");
            } catch (e) {
                // Do nothing
            }

            try {
                fs.remove(constants.uploads + "/" + ref);
            } catch (e) {
                // Do nothing
            }

            resolve();
        });
    }));
}

function downloadSong(filename, url) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(constants.uploads + "/" + filename);

        http.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                if (response.statusCode === 200)
                    resolve();
                else {
                    fs.remove(constants.uploads + "/" + filename);
                    reject("Couldn't find that resource");
                }
            });
        }).on('error', (err) => {
            fs.remove(constants.uploads + "/" + filename);
            reject(err);
        });
    });
}

module.exports = {
    readMetadata,
    addNewSong,
    downloadSong
};