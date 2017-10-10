'use strict';

console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const fs = require('fs');
const unzipper = require('unzipper');
const upload_stream = require("s3-stream-upload");
const csv = require('csv');

exports.handler = function(event, context, callback) {
    // Get the object from the event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const params = {
        Bucket: bucket,
        Key: key,
    };
    const parser = csv.parse({delimiter: '\t', relax: true})

    unzipper.Open.s3(s3, params)
      .then(function(d) {
        console.log('directory',d);
        d.files.forEach(function(file) {
          if (file.path == 'hit_data.tsv') {
            var new_path = file.path.replace('.tsv', '.csv')
            file.stream()
              .pipe(parser)
              .pipe(csv.stringify())
              .pipe(upload_stream(s3, { Bucket: bucket, Key: key.replace('cruproduction/', 'cruproduction/unzipped/').replace('.zip','/') + new_path }))
          }
        });
      });
};
