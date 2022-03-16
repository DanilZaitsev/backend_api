var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    // EXAMPLE without Q -> less cpu usage
    let response_count = 0;
    const merged = {};

    function responseCallback(data, name) {
        merged[name] = (data && data.results) ? data.results : [];
        merged[name].map(function (obj, inx) {
            return obj.id = (inx + 1).toString();
        });

        response_count++;
        if (response_count === 2)
            res.send('DDD3' + JSON.stringify(merged));
    }

    const id = req.query.id ? req.query.id : '';
    const films_url = 'https://swapi.dev/api/films/' + id;
    doRequest(films_url, 'shows', responseCallback);
    const people_url = 'https://swapi.dev/api/people/' + id;
    doRequest(people_url, 'people', responseCallback);
});

function doRequest(url, obj_name, callback) {
    request({ url }, function (error, response, body) {
        callback(JSON.parse(body), obj_name);
    });
}

module.exports = router;


// var Promise = require('bluebird');
// var Q = require('q');
// var prom = ['Promise1', 'Promise2'];
// var allPromise = Q.all(prom);
// allPromise.then(function (allResponses) {
//     logger.info('updateBulkAgents: ' + path, allResponses);
//     if (allResponses[0].err)
//         return functions.sendError(next, new Error(ERRORS.BAD_REQUEST.INVALID_FORMATS));
//     else
//         functions.sendData(request, next, allResponses);
// }).catch(function (e) {
//     return functions.sendError(next, e);
// });
//
// function getAll() {
//     return new Promise(function (resolve, reject) {
//         resolve([]);
//     });
// }
