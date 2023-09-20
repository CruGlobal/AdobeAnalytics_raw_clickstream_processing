# Archived Repository
This respository is no longer under development and has been archived.

# AdobeAnalytics raw clickstream processing

A node.js lambda script for extracting adobe analytics clickstreams for
further processing.

It uses [node-lambda](https://github.com/motdotla/node-lambda) under the hood to locally run and also deploy your node.js Amazon Lambda application.

## Install

Clone this repository.

```
npm install
```

## Usage

There are 4 available commands to use on this template. For more info and usage descriptions, see the [node-lambda](https://github.com/motdotla/node-lambda) repository.

```
cd /to/your/template/path
npm run setup # setup node-lambda files
npm run test # test your event handler and check output
npm run package # just generate the zip that would be uploaded to AWS
npm run deploy # deploy to AWS
```
