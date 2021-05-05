const {GRPC_IP, GRPC_PORT } = require("../config/config")
const PROTO_PATH = __dirname + '/../literature/literature.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const literature_proto = grpc.loadPackageDefinition(packageDefinition).literature;
const target = `${GRPC_IP}:${GRPC_PORT}`;
const grpcclient = new literature_proto.Literature(target, grpc.credentials.createInsecure());
module.exports = grpcclient;