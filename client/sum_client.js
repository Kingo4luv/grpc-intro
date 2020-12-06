const sums = require('../server/protos/sum_pb');
const service = require('../server/protos/sum_grpc_pb');
const grpc = require('grpc')

function main(){
    const client = new service.SumServiceClient(
        'localhost:50051',
        grpc.credentials.createInsecure()
    )
   

    const request = new sums.SumRequest()

    const summing = new sums.Summation()

    summing.setFirstNumber(10)
    summing.setLastNumber(15)

    //Set the greeting
    request.setSummation(summing)

    client.sum(request, (error, response) => {
        if(!error){
            console.log(response.getResult());
        }else{
            console.error(error);
        }
    })
}

main();