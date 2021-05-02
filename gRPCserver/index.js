const http = require('http');
const port = process.env.PORT || 50051;


//proto buffer
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




// grpc server
const testService = require("./services/test")
const authorService = require("./services/author")
const grpcServer = new grpc.Server();
grpcServer.addService(literature_proto.Literature.service,{...testService, ...authorService});
grpcServer.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  grpcServer.start();
});
