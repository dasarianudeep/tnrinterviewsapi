'use strict';
const AWS = require('aws-sdk');
const service = require('./service');
const config = require('./config');

const s3 = new AWS.S3({
    secretAccessKey: config.secretAccessKey,
    accessKeyId: config.accessKeyId
});

module.exports.getInterviews = (event, context, callback) => {

    s3.getObject({
        Bucket: 'tnrshows',
        Key: 'index.json'
    }, (err, data) => {
        if (err) {
            return callback(new Error('Unable to get Object from S3'))
        } else {
            const interviews = JSON.parse(data.Body.toString());
            let updatedInterviews = [];
            const queryParams = event.queryStringParameters;
            const name = queryParams && queryParams.q;
            const year = queryParams && queryParams.year;
            const genre = queryParams && queryParams.genre;
            const page = queryParams && queryParams.page;
            if (name || year || genre || page) {
                if (name) {
                    updatedInterviews = service.searchByName(interviews, name);
                }
                if (year) {
                    updatedInterviews = service.searchByYear(updatedInterviews.length ? updatedInterviews: interviews, year);
                }
                if (genre) {
                    updatedInterviews = service.searchByGenre(updatedInterviews.length ? updatedInterviews: interviews, genre);
                }
                if (page) {
                    updatedInterviews = service.searchByPage(interviews, page);
                }
            } else {
                updatedInterviews = interviews.slice(0, 20);
            }

            callback(null, {
                statusCode: 200,
                body: JSON.stringify(updatedInterviews)
            })
        }
    })


};


