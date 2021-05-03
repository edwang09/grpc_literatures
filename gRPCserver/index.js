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
const bookService = require("./services/book")
const awardService = require("./services/award")
const authorGrantService = require("./services/author_grant")
const bookGrantService = require("./services/book_grant")
const bookAuthorService = require("./services/book_author")
const reportService = require("./services/report")
const grpcServer = new grpc.Server();
grpcServer.addService(literature_proto.Literature.service,{
  ...testService, 
  ...authorService, 
  ...bookService, 
  ...awardService,
  ...authorGrantService,
  ...bookGrantService,
  ...bookAuthorService,
  ...reportService
});
grpcServer.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
  grpcServer.start();
});
