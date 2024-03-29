const navigation = require('./navigation/navigation.routes');
const management = require('./management/management.routes');

/**
 * @api {get} /ok Check if the server is up
 * @apiName ok
 * @apiGroup App
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "Your server is up and ready"
 *     }
 */
async function ok(req, res) {
    return res.status(200).json({
        status: 'success',
        message: 'Server is up and ready'
    })
}

module.exports = function(server) {
    server.use('/', navigation);
    server.use('/', management);

    server.use('/ok', ok);

    server.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err)
    })
};
