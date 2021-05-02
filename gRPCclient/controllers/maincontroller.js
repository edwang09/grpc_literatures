const http = require('http');
const testcontroller = require('./testcontroller');
const authorcontroller = require('./authorcontroller');
const grpcclient = require('../grpc/grpcclient')
const URL = require('url').URL;

module.exports = http.createServer((req, res) => {
    const baseURL = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseURL);
    switch (reqUrl.pathname) {
        case '/test':
            testcontroller.handle(req, res, grpcclient, reqUrl);
            break;
        case '/authors':
            authorcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
    
        default:

            res.end("undefined routing");
            break;
    }

});