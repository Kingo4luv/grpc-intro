const sums = require('../server/protos/sum_pb');
const service = require('../server/protos/sum_grpc_pb');
const grpc = require('grpc')

/*
     Implements the greet RPC method.
*/

function sum(call, callback){
    const summing = new sums.SumResponse();

    summing.setResult(
        `The sum of ${call.request.getSummation().getFirstNumber()} and ${call.request.getSummation().getLastNumber()} is ${call.request.getSummation().getFirstNumber()+call.request.getSummation().getLastNumber()}`
    )

    callback(null, summing);
}

function main(){
    const server = new grpc.Server();
    server.addService(service.SumServiceService, {sum:sum});

    server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
    server.start();

    console.log('Server running on port 127.0.0.1:50051');

}

main();