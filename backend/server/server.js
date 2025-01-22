const PROTO_PATH = "../proto/question.proto"
const DATA_FILE = "./speakx_question.json"

import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
import { v4 as uuid } from "uuid"
import mongoose, { Schema } from "mongoose"

var packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase : true,
    longs : true,
    enums : true,
    arrays : true
})

var questionsProto = grpc.loadPackageDefinition(packageDefinition);

mongoose.connect("mongodb+srv://Chatbox:Sagar123@cluster0.zt4c0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB connected")).catch((err)=>console.log(err));

const questionSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true
    },
    anagramType : {
        type : String,
        required : true
    },
    blocks : [{
        text : String,
        showInOption : Boolean,
        isAnswer : Boolean,
    }],
    siblingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    },
    solution : {
        type : String,
    },
    title : {
        type : String
    }
})

const Question = mongoose.model("Question",questionSchema);

const server = new grpc.Server();

server.addService(questionsProto.QuestionService.service, {
    get: async(call, callback) => {
        try {
            console.log("Full request:", call.request);
            const {title, page, type} = call.request;
            console.log(" This is title ", title)
            console.log(" This is page ", page)
            console.log(" This is type ", type)


            const questions = await Question.find({
                title : { $regex : title, $options : "i"},
                type : {$regex : type, $options : "i"}
            }).skip((page-1)*10).limit(10);

            
            const total = await Question.countDocuments({
                title : { $regex : title, $options : "i"},
                type : {$regex : type, $options : "i"}
            });
            console.log(questions)
            console.log(`Total number of documents are : ${total}`)
            callback(null, {question : questions.map(q => ({
                type : q.type,
                title : q.title
            })), total})

               
        } catch (error) {
            callback(error, null)
        }
  
    },
    getAll : async(_, callback) => {
        try {
            const questions = await Question.find({}).limit(10);
            console.log(questions);
            const total = await Question.countDocuments();

            callback(null, {question : questions.map(q => ({
                type : q.type,
                title : q.title
            })), total})

        } catch (error) {
            callback(error, null);
        }
    }
})



server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), ()=>{
    console.log("grpc server started running");
})