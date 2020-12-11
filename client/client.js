const greets = require('../server/protos/greet_pb');
const service = require('../server/protos/greet_grpc_pb');
const grpc = require('grpc')


function callGreetManyTimes(){
    const client = new service.GreetServiceClient('localhost:50051',
        grpc.credentials.createInsecure()
    );

    const request = new greets.GreetManyTimesRequest();

    const greeting = new greets.Greeting();
    greeting.setFirstName("Kingsley");
    greeting.setLastName("Atanang");

    request.setGreeting(greeting);

    const call = client.greetManyTimes(request, () => {});

    call.on('data', (response) => {
        console.log('Client streaming Response', response.getResult());
    });

    call.on('status', (status) => {
        console.log(status.details);
    });
    call.on('error', (error) => {
        console.log(error.details);
    });
    console.log('end', () => {
        console.log('Streaming ended')
    })
}

// function main(){
//     const client = new service.GreetServiceClient(
//         'localhost:50051',
//         grpc.credentials.createInsecure()
//     )
   

//     const request = new greets.GreetRequest()

//     const greeting = new greets.Greeting()

//     greeting.setFirstName("Jerry")
//     greeting.setLastName("Tom")

//     //Set the greeting
//     request.setGreeting(greeting)

//     client.greet(request, (error, response) => {
//         if(!error){
//             console.log("Greeting Response ", response.getResult());
//         }else{
//             console.error(error);
//         }
//     })
// }

function main(){
    callGreetManyTimes();
}

main();