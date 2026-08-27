const http = require("http");
// const fs = require("fs");
// const url = require("url");

const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Home Page");
});
app.get("/about", (req, res) => {
    return res.send("About Page "+ "Hey" + req.query.name 
        // + " You are "+ req.query.age + " years old"
    );
});


app.listen(8622, () => console.log("Server is running on port 8622"));
// const myServer = http.createServer(app);

    
// before express 
// const myServer = http.createServer((req, res) => {
//     const log = `${new Date()}: ${req.method} ${req.url} New Request received\n`;
//     const myUrl = url.parse(req.url, true);
//     console.log(myUrl.pathname);

//     fs.appendFile("log.txt", log, (err) => {
//         if (err) {
//             console.log(err);
//             res.statusCode = 500;
//             return res.end("Server error");
//         }

//         if (req.url === "/favicon.ico") {
//             return res.end();
//         }

//         switch (myUrl.pathname) {
//             case "/":
//                 if (req.method === "GET") res.end("Home Page");
//                 break;
//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi ${username}`);
//                 break;
//             case "/search":
//                 const searchTerm = myUrl.query.q;
//                 res.end(`Search results for "${searchTerm}"`);
//                 break;
//             case "/signup":
//                 if (req.method === "GET") res.end("This is a signup form");
//                 else if (req.method === "POST") res.end("Signup form submitted!");
//                 break;
//             default:
//                 res.end(`<h1>404 Page Not Found</h1>`);
//         }
//     });
// });

// myServer.listen(8622, () => console.log("Server is running on port 8622"));