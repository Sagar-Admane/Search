import client from "./client/client.js";
import express from "express"
import cors from "cors";

const app = express();
app.use(express.urlencoded({extended : true}))
app.use(cors());
app.use(express.json())

app.get("/",(req, res)=>{
    
    client.getAll(null, (err, data)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"message" : "Internal Server error"})
        }

        res.json({result : data || []})
    })
})

app.post("/search", (req, res)=>{
    const {title, page, type} = req.body;

    if(!title && !page ){
        return res.status(400).json({message : "There is some error"});
    }

    console.log("This is new ")

    client.get({title, page, type}, (err, data) => {
        console.log(title);
        if(err){
            console.log(err);
            return res.status(500).json({message : "Internal server error"});
        }

        res.json({result : data || []})
    })
})

app.listen(5000,()=>{
    console.log(`port started running on ${5000}`)
})