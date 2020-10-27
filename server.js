var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var app=express()
const uri = "mongodb+srv://dbuser1:dbuser1@cluster0.9lzkt.mongodb.net/messagedb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true , useNewUrlParser: true });

let collectionMessages;

app.use(express.static(__dirname + '/public'));

var printMessage  = function(message){
    console.log('[Server] @' + moment().format()+' '+message)
}


client.connect(err => {
    collectionMessages = client.db("messagedb").collection("messages");
});

const insertMessage = (msg)=>{ 
    collectionMessages.insertOne({message:msg});
}

const getAllMessage = (res)=>{
    if(collectionMessages){
        collectionMessages.find().toArray(function(err,result){
            if(err) throw err;
            res.send(result);
        })
    }
}


app.get("/addMessage",function(req,res){
    let message = req.query.message
    insertMessage(message);
    res.send("Message: '" +message+ "' successfully added into the collection");
})

app.get("/getAllMessage",function(req,res){
    getAllMessage(res);
})

var port = 3000;
app.listen(port);
printMessage("Listening on port: "+port);

