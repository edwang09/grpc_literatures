const http = require('http');
const testcontroller = require('./testcontroller');
const authorcontroller = require('./authorcontroller');
const bookcontroller = require('./bookcontroller');
const awardcontroller = require('./awardcontroller');
const authorgrantcontroller = require('./authorgrantcontroller');
const bookgrantcontroller = require('./bookgrantcontroller');
const bookauthorcontroller = require('./bookauthorcontroller');
const reportcontroller = require('./reportcontroller');
const grpcclient = require('../grpc/grpcclient')
const URL = require('url').URL;

module.exports = http.createServer((req, res) => {
    const baseURL = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseURL);
    switch (reqUrl.pathname.split("/")[1]) {
        case 'test':
            testcontroller.handle(req, res, grpcclient, reqUrl);
            break;
        case 'authors':
            authorcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
        
        case 'books':
            bookcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;

        case 'awards':
            awardcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
    
        case 'authorgrants':
            authorgrantcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
                
        case 'bookgrants':
            bookgrantcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
            
        case 'bookauthors':
            bookauthorcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
        case 'reports':
            reportcontroller.handle(req, res, grpcclient, reqUrl);
            
            break;
        default:

            res.end("undefined routing");
            break;
    }

});