const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res)=>{
    const log = `${new Date()}: New Request recieved \n`
    fs.appendFile("log.txt", log, (err, result)=>{
        if(err){
            console.log(err);}
            else{
            switch(req.url){
                case "/":
                    res.end(`<h1>Welcome to Home Page</h1>`)
                    break;
                case "/about":
                    res.end(`<h1>Welcome to About Page</h1>`)
                    break;
                default:
                    res.end(`<h1>404 Page Not Found</h1>`)
            }
}
    }

)});


myServer.listen(8622,()=>console.log("Server is running on port 8622"));