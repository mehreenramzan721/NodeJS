const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res)=>{
    const log = `${new Date()}: New Request recieved \n`
    fs.appendFile("log.txt", log, (err, result)=>{
        if(err){
            console.log(err);}
            else{
            res.end("Hello World Again");
}
    }

)});


myServer.listen(8622,()=>console.log("Server is running on port 8622"));