'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const fs = require('fs');
const unzipper = require('unzipper');
const upload_stream = require("s3-stream-upload");

exports.handler = function(event, context, callback) {
    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    unzipper.Open.s3(s3, params)
      .then(function(d) {
        console.log('directory',d);
        return new Promise(function(resolve, reject) {
          d.files.forEach(function(file) {
            file.stream()
              .pipe(upload_stream(s3, { Bucket: bucket, Key: key.replace('cruproduction/', 'cruproduction/unzipped/').replace('.zip','/') + file.path }))
              .on('error',reject)
              .on('finish',resolve)
          });
        });
      });
};
