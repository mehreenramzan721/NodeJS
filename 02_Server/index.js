const http = require("http");
const fs = require("fs");

const url = require("url");

const myServer = http.createServer((req, res)=>{
    const log = `${new Date()}:${req.url} New Request recieved \n`

    const myUrl = url.parse(req.url, true);
    console.log(myUrl.pathname);
    fs.appendFile("log.txt", log, (err, result)=>{
        if(err){
            console.log(err);}
            else{
                if(req.url=="/favicon.ico"){
                    res.end();
                }
            switch(req.url){
                case "/":
                    res.end(`<h1>Welcome to Home Page</h1>`)
                    break;
                case "/about":
                    const username = myUrl.query.myname;
                    res.end(`Hi ${username}`)
                    break;
                case "/search":
                    const searchTerm = myUrl.query.q;
                    res.end(`Search results for "${searchTerm}"`)
                    break;
                default:
                    res.end(`<h1>404 Page Not Found</h1>`)
            }
}
    }

)});


myServer.listen(8622,()=>console.log("Server is running on port 8622"));