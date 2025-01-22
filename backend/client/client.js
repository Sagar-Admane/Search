import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
const PROTO_PATH = "./proto/question.proto"


var packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase : true,
    longs : true,
    enums : true,
    arrays : true
})

const QuestionService =  grpc.loadPackageDefinition(packageDefinition).QuestionService;

const client = new QuestionService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

export default client;