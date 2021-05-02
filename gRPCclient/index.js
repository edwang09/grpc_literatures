/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const http = require('http');
const port = process.env.PORT || 3000;
const {GRPC_IP, GRPC_PORT } = require("./config/config")

var PROTO_PATH = __dirname + '/protos/literature.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var literature_proto = grpc.loadPackageDefinition(packageDefinition).literature;


const server = http.createServer((req, res) => {
    const target = `${GRPC_IP}:${GRPC_PORT}`;
    const client = new literature_proto.Literature(target, grpc.credentials.createInsecure());

    var url = req.url;
    if(url ==='/test'){
        client.TestgRPC({body: "hello world"}, function(err, response) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            console.log("got response from server")
            res.end(response.body);
        });
    }else if(url ==='/api/v1/authors'){
        client.GetAllAuthors({}, function(err, response) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            console.log("got response from server")
            console.log(response)
            console.log(response.authors)
            res.end(JSON.stringify(response.authors));
        });
    }else{
        res.end("undefined routing");
    }

    
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});