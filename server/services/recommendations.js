const request = require('request');

exports.scan = (url, cloud_id) => { 
    request.post(
    url,
    { json: { identity: cloud_id } },
    function (error, response, body) {
        console.log(response.body);
        if (!error && response.statusCode === 200) {
            console.log('SUCCEED!');
        }
        return response.body;
    }
);};















